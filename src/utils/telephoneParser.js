export default function telephoneParser(string) {
    return string.replaceAll("-", '')
        .replaceAll(" ", '')
        .replaceAll(")",'')
        .replaceAll("(", "")
}