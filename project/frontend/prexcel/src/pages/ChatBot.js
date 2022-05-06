import {Button, Card, Grid, List, Paper, TextField} from "@mui/material";
import ScreenIds from "./ScreenIds";
import React, {useRef, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


export default function ChatBotScreen(props) {

   const questions = [
      {
         position: "left",
         question: "1. How is my presentation graded?",
         answer: "Your presentation is graded based on 3 criteria. First of these is the face detection score, " +
            "which is a measure of how long you kept face contact with the camera. Second is the gap score, which is a " +
            "measure of how much big gaps you had in your speech. Final score is the filler words/dragged words score," +
            " which is determined based on how many words you dragged, or repeated during the presentation.",
         color: "lightblue"
      },
      {
         position: "left",
         question: "2. How can I start a live presentation?",
         answer: 'Go to the "Start a Presentation" tab, enter the name of your presentation and the select the option ' +
            'for starting a live presentation. You will have a chance to calibrate your camera in this screen. ' +
            'Once you continue to presentation screen, you can start the presentation by the relevant button. ' +
            'You will see the your face detection and volume on the left, as well as the word recommendations right below them. ' +
            'Your transcript will also be printed on the screen. You can end the presentation at any time and return to main menu.',
         color: "lightblue"
      },
      {
         position: "left",
         question: "3. How can I upload recording of a presentation?",
         answer: 'Go to the "Start a Presentation" tab,  enter the name of your presentation and the select the option ' +
            'for uploading a presentation. Your presentation will be processed. You will not be able to move to' +
            ' any other screen during this time. Once finished, you can see your detailed analysis report from the ' +
            '"My Presentations" screen.',
         color: "lightblue"
      },
      {
         position: "left",
         question: "4. Is my personal data stored?",
         answer: 'We never store your personal data. All you data is processed on your machine locally, ' +
            'and never uploaded to cloud.',
         color: "lightblue"
      },
      {
         position: "left",
         question: "5. How can I track my progress across presentations?",
         answer: 'From the "My Presentations" screen, select the presentations you want to track and select see progress report.',
         color: "lightblue"
      },
      {
         position: "left",
         question: "6. Can I delete my account/presentations?",
         answer: 'Yes. You can do both on the "User-Account Details" screen.',
         color: "lightblue"
      }
   ];

   function initializeChatBotMessage() {
      let msgObj = [{
         position: "left",
         question: "",
         color: "#2979ff"
      }];
      for (let i in questions) {
         msgObj[0].question = msgObj[0].question + questions[i].question + "\n";
         //console.log(msgObj[0].question);
      }
      return msgObj;
   }

   const [messageList, setMessageList] = useState(initializeChatBotMessage);

   const [newQuestionNumber, setNewQuestionNumber] = useState(0);
   const [value, setValue] = useState('');



   

   const chatbot_end_ref = useRef(null)
    
   const scrollToTop = () => {
      chatbot_end_ref.current.scrollIntoView({ behavior: "smooth" })
   }
   
   
   function goBackToMainMenu() {
      props.onChatBot(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   function ChatItem(props) {

      const rootStyle = {
         width: "100%",
         height: "auto",
         marginTop: "0%",
         marginBottom: "0%"
      };

      const messageStyle = {
         width: "51%",
         marginTop: "1.5%",
         marginBottom: '1.5%',
         height: "auto",
         float: props.position,
         background: props.color,
         color: "whitesmoke",

         overflowWrap: "break-word",
         wordWrap: "break-word",
         //hyphens: "auto"
      };

      return (
         <div style={rootStyle}>
            <Card elevation={8} style={messageStyle}>{props.text.split('\n').map(str => <p
               style={{marginLeft: '5%', marginRight: '5%'}}>{str}</p>)}</Card>
         </div>
      );
   }

   function makeKey() {
      const key = Math.random().toString(16).substr(2);
      return key;
   }

   function TextList(props) {

      const key0 = makeKey();

      return (
         <List>
            {props.messageList.map((message) => (
               <ChatItem key={key0.toString()} position={message.position} color={message.color} text={message.question}/>))}
         </List>
      );
   }

   function deleteMessages() {
      setMessageList(initializeChatBotMessage);
   }

   const questionAskHandler = (event) => {
      setNewQuestionNumber(event.target.value);
      setValue(event.target.value);
   };

   function questionSubmitHandler(event) {
      event.preventDefault();

      const newQuestionNumberText = {
         position: "right",
         question: newQuestionNumber.toString(),
         color: "gray"
      };

      let answ = "";

      console.log(isNaN(newQuestionNumber));

      if (isNaN(newQuestionNumber))
         answ = "Please enter a valid question number"; // string is not numeric
      else if (newQuestionNumber < 1 || newQuestionNumber > questions.length)
         answ = answ + "Answer to the question " + newQuestionNumber + " is NOT available.";
      else
         answ = answ + questions[newQuestionNumber - 1].answer;

      const newAnswer = {
         position: "left",
         question: answ,
         color: "#2979ff"
      };

      const questionList = messageList[0];

      const newList = [...messageList, newQuestionNumberText, newAnswer, questionList];
      setMessageList(newList);

      setValue(""); // clears the input field
   }

   return (
      <div>
         <Grid container spacing={2}>

            <Grid item xs={3}/>
            <Grid item xs={6} style={{height: "100vh"}}>

               <h1 style={{color:'whitesmoke', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  Interactive Q&A Chat Bot
               </h1>

               <Paper
                  id= "paper_id"
                  elevation={8}
                  sx={{

                     height: '65%',
                     maxHeight: '65%',
                     overflow: "auto",
                     marginTop: '5%',
                     marginBottom: '5%',
                     alignItems: 'center',
                     justifyContent: 'center',
                     backgroundColor: 'whitesmoke',
                     padding: "5%"
                  }}
                  className="App"
               >
                  <TextList messageList={messageList}/>
                  <div ref={chatbot_end_ref}/>
               </Paper>

               <form onSubmit={questionSubmitHandler}>
                  <Button onClick={scrollToTop} style={{color:"#2979ff"}} size="large" endIcon={<ArrowUpwardIcon/>} variant="text"> </Button>
                  <TextField size="small" sx={{
                     marginLeft: '1%',
                     marginRight: '1%',
                     alignItems: 'center',
                     border: "2px solid #507786",
                     borderRadius: '5px',
                     backgroundColor: 'whitesmoke'
                  }} value={value} onChange={questionAskHandler} required
                             label="Enter question no"
                             variant="filled"/>

                  <Button size="large" type="submit" endIcon={<SendIcon/>} style={{fontSize:'119%'}}
                          variant="contained">send</Button><br/>

               </form>
               <Button style={{marginTop: '2%', marginRight:'1%'}} variant="contained"
                       onClick={deleteMessages}>Clear</Button>
               <Button data-testid="main_menu_button_id" style={{marginTop: '2%', marginLeft:'1%'}} variant="contained"
                       onClick={goBackToMainMenu}>Main Menu</Button>
            </Grid>
            <Grid item xs={3}/>

         </Grid>
      </div>
   );
}
//<Paper sx={{marginLeft:'40%', marginRight:'40%', alignItems:'center', backgroundColor: 'lightblue'}} elevation={4}>