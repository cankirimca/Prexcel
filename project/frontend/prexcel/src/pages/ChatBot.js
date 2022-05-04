import {Button, Card, Grid, List, Paper, TextField} from "@mui/material";
import ScreenIds from "./ScreenIds";
import React, {useRef, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


export default function ChatBotScreen(props) {

   const questions = [
      {
         position: "left",
         question: "1. Tell Me About Yourself.",
         answer: 'This question seems simple, so many people fail to prepare for it, but it’s crucial. Here\'s the deal: Don’t give your complete employment (or personal) history. Instead, give a pitch—one that’s concise and compelling and that shows exactly why you’re the right fit for the job. Muse writer and MIT career counselor Lily Zhang recommends using a present, past, future formula. Talk a little bit about your current role (including the scope and perhaps one big accomplishment), then give some background as to how you got there and experience you have that’s relevant. Finally, segue into why you want—and would be perfect for—this role.',
         color: "lightblue"
      },
      {
         position: "left",
         question: "2. How Did You Hear About This Position?",
         answer: 'Another seemingly innocuous interview question, this is actually a perfect opportunity to stand out and show your passion for and connection to the company. For example, if you found out about the gig through a friend or professional contact, name-drop that person, then share why you were so excited about the job. If you discovered the company through an event or article, share that. Even if you found the listing through a random job board, share what, specifically, caught your eye about the role.',
         color: "lightblue"
      },
      {
         position: "left",
         question: "3. Why Do You Want to Work at This Company?",
         answer: 'Beware of generic answers! If what you say can apply to a whole slew of other companies, or if your response makes you sound like every other candidate, you’re missing an opportunity to stand out. Zhang recommends one of four strategies: Do your research and point to something that makes the company unique that really appeals to you; talk about how you’ve watched the company grow and change since you first heard of it; focus on the organization’s opportunities for future growth and how you can contribute to it; or share what’s gotten you excited from your interactions with employees so far. Whichever route you choose, make sure to be specific. And if you can’t figure out why you’d want to work at the company you’re interviewing with by the time you’re well into the hiring process? It might be a red flag telling you that this position is not the right fit.',
         color: "lightblue"
      },
      {
         position: "left",
         question: "4. Why Do You Want This Job?\n",
         answer: 'Again, companies want to hire people who are passionate about the job, so you should have a great answer about why you want the position. (And if you don’t? You probably should apply elsewhere.) First, identify a couple of key factors that make the role a great fit for you (e.g., “I love customer support because I love the constant human interaction and the satisfaction that comes from helping someone solve a problem”), then share why you love the company (e.g., “I’ve always been passionate about education, and I think you’re doing great things, so I want to be a part of it”).',
         color: "lightblue"
      },
      {
         position: "left",
         question: "5:   Question 5 LooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooNG",
         answer: 'Answer 5 LoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooNG',
         color: "lightblue"
      },
      {
         position: "left",
         question: "6:   Question 6 heheh heheh hehe hehe ehhe ehh eheheh ehehhe ehhehe ehheh ehhehe hehehe ehhehe ",
         answer: 'Answer 6 ehbehbehehe ehbheb hebhe hebhehb  hbehhehb  bhehehbhehb hebhhe',
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

   /////
   const ref = useRef();

   function scrollToTop() {
      if (ref.current) {
         ref.current.scrollIntoView({behavior: "smooth", block: "end"});
      }
   }
   /////


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
         color: "#E5E5E5",

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
      const newList = [...messageList, newQuestionNumberText, newAnswer];
      setMessageList(newList);

      setValue(""); // clears the input field
   }

   return (
      <div>
         <Grid container spacing={2}>

            <Grid item xs={3}/>
            <Grid item xs={6} style={{height: "100vh"}}>

               <h1 style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  ChatBot
               </h1>

               <Paper
                  elevation={8}
                  sx={{

                     height: '65%',
                     maxHeight: '65%',
                     overflow: "auto",
                     marginTop: '5%',
                     marginBottom: '5%',
                     alignItems: 'center',
                     justifyContent: 'center',
                     backgroundColor: 'whitesmoke'
                  }}
                  className="App"
               >
                  <TextList messageList={messageList}/>
                  <div ref={ref}/>
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