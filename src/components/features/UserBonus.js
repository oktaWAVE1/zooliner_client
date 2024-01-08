import React, {useContext, useEffect, useState} from 'react';
import {fetchBonus} from "../../http/userAPI";
import JsBarcode from "jsbarcode";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useIsMobile} from "../../hooks/useIsMobile";
import ModalUserBonus from "../modals/ModalUserBonus";

const UserBonus = observer(() => {

    const {user} = useContext(Context)
    const [logsModal, setLogsModal] = useState(false);
    const [logs, setLogs] = useState([]);
    const [userBonus, setUserBonus] = useState(0);
    const isMobile = useIsMobile()
    useEffect(() => {
        fetchBonus().then(res => {
            setUserBonus(res.currentQty)
            setLogs(res.bonus_points_logs)
        })
        JsBarcode("#barcode", user.user.id, {format: "code39", width: 3, height: 50, displayValue: false});

    }, [user.user.id]);

    return (
        <section className="w-100 d-flex flex-column align-items-center">
            <div onClick={() => setLogsModal(true)} className="userPageBonus pointer mb-2">
                <h4>Ваши бонусы: {userBonus}</h4>
            </div>
            <div style={isMobile ? {visibility: "visible"} : {visibility: "hidden", height: "0"}}>
                <svg id="barcode"></svg>
            </div>
            <ModalUserBonus onHide={() => setLogsModal(false)} show={logsModal} logs={logs.sort((a, b) => b.id - a.id)} />

        </section>
    );
});

export default UserBonus;