import {Button, Card, Grid, Paper, TextField, List} from "@mui/material";
import ScreenIds from "./ScreenIds";
import React, {useState} from "react";
import SendIcon from '@mui/icons-material/Send';


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

   const [messageList, setMessageList] = useState(()=>{
      let msgObj = [{
         position: "left",
         question: "",
         color: "lightblue"
      }];
      for (let i in questions) {
         msgObj[0].question = msgObj[0].question + questions[i].question + "\n";
         console.log(msgObj[0].question);
      }
      return msgObj;
   });

   const [newQuestionNumber, setNewQuestionNumber] = useState(0);
   const [value, setValue] = useState('');

   function goBackToMainMenu() {
      props.onChatBotScreen(ScreenIds.MAIN_MENU_SCREEN_ID);
   }

   function ChatItem({ position, color, text }) {
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
         float: position,
         background: color,

         overflowWrap: "break-word",
         wordWrap: "break-word",
         //hyphens: "auto"
      };

      return (
         <div style={rootStyle}>
            <Card style={messageStyle}>{text.split('\n').map(str => <p>{str}</p>)}</Card>
         </div>
      );
   }

   function TextList(props) {
      return (
         <List>
            {props.messageList.map((message) => ( <ChatItem position={message.position} color={message.color} text={message.question}/>))}
         </List>
      );
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
         color: "lightgray"
      };

      let answ = "";

      console.log(isNaN(newQuestionNumber));

      if (isNaN(newQuestionNumber))
         answ = "Please enter a valid question number"; // string is not numeric
      else if (newQuestionNumber > questions.length)
         answ = answ + "Answer to the question " + newQuestionNumber + " is NOT available.";
      else
         answ = answ + questions[newQuestionNumber - 1].answer;

      const newAnswer = {
         position: "left",
         question: answ,
         color: "lightblue"
      };
      const newList = [...messageList, newQuestionNumberText, newAnswer];
      setMessageList(newList);

      setValue(""); // clears the input field
   }

   return (
      <div style={{height: "100vh"}}>

         <h1 style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
            ChatBot
         </h1><br/>

         <Paper
            elevation={3}
            sx={{
               border: "1px solid black",
               height:'50%',
               maxHeight:'50%',
               overflow: "auto",
               marginTop: '5%',
               marginBottom:'5%',
               alignItems:'center',
               justifyContent:'center',
               marginLeft:'33%',
               marginRight:'33%',
            }}
            className="App"
         >
            <TextList messageList={messageList}/>
         </Paper>

         <form onSubmit={questionSubmitHandler}>
            <TextField value={value} onChange={questionAskHandler} required sx={{width:'28%'}} label="Enter the question number" variant="outlined" />
            <Button type="submit" endIcon={<SendIcon />} sx={{marginLeft:'1%'}} variant="contained">send</Button><br/>
         </form>

         <Button sx={{marginTop:'2%'}} variant="contained" onClick={goBackToMainMenu}>Main Menu</Button>

      </div>
   );
}