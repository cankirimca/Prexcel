import {Button, Card, Grid, Paper, TextField} from "@mui/material";
import ScreenIds from "./ScreenIds";
import React from "react";

export default function ChatBotScreen(props) {

   function goBackToMainMenu() {
      props.onChatBotScreen(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   function ChatItem({ position, color }) {
      const rootStyle = {
         width: "100%",
         height: 50,
         marginTop: 10,
         marginBottom: 10
      };

      const messageStyle = {
         width: "75%",
         marginTop: 20,
         height: 50,
         float: position,
         background: color
      };

      return (
         <div style={rootStyle}>
            <Card style={messageStyle}>Some message xd !</Card>
         </div>
      );
   }

   return (
      <div>
         <Grid container spacing={2}>

            <Grid item xs={12}>
               <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                  ChatBot
               </h1><br/>
            </Grid>

            <Grid item xs={4}/>
            <Grid item xs={4}>
               <Paper
                  elevation={3}
                  style={{
                     border: "1px solid black",
                     width: "100%",
                     height: "60%",
                     overflowY: "scroll",
                     overflowX: "hidden",
                     marginTop: '15%', marginBottom:'5%', flexDirection:'row', alignItems:'center', justifyContent:'center'
                  }}
                  className="App"
               >
                  <ChatItem position={"right"} color={"lightblue"} />
                  <ChatItem position={"left"} color={"#ffb3b3"} />
                  <ChatItem position={"right"} color={"lightblue"} />
                  <ChatItem position={"left"} color={"#ffb3b3"} />
                  <ChatItem position={"right"} color={"lightblue"} />
                  <ChatItem position={"left"} color={"#ffb3b3"} />
                  <ChatItem position={"right"} color={"lightblue"} />
                  <ChatItem position={"left"} color={"#ffb3b3"} />
                  <ChatItem position={"right"} color={"lightblue"} />
               </Paper>
               <TextField sx={{width:'60%'}} label=" " variant="outlined" />
               <Button sx={{marginLeft:'1%'}} variant="contained">send</Button><br/>
               <Button sx={{marginTop:'2%'}} variant="contained" onClick={goBackToMainMenu}>Main Menu</Button>
            </Grid>
            <Grid item xs={4}/>
         </Grid>
      </div>
   );
}