import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#D5F3E4"        
    },
    inputs: {
        width: "80%",
        backgroundColor: "#EBFCF3"
    },
    buttons: {
        backgroundColor: "#A1E0BF"
    },
    textNavigation:{
        marginTop: 10,
        fontSize: 15,
        color: "#7D7C7E",
        fontWeight: "bold"
    },
    contentHome:{
        flex:1,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    headerHome:{
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    image:{
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    logo:{
        width:180
    },
    icon: {
        flex: 1,
        alignItems: "flex-end"
    },
    iconPlus: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    modalProfile: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 20,
    },
    headerModal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    contentBook: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: "center"
    },
    contentDetail:{
        flex:1,
        paddingHorizontal:20,
        backgroundColor:"#fff",
        gap:20
    },
    tituloBook:{
        flexDirection:"row",
        alignItems:"center"
    },
    detailText:{
        marginBottom:5,
        fontWeight:"bold",
        fontSize:20
    },
    buttonModal:{
        marginTop: 10,
        backgroundColor:'#CF571F',
    }
  })