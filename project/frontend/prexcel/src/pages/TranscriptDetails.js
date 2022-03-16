import ScreenIds from "./ScreenIds";
import {Button, Grid, Paper, TextField} from "@mui/material";


export default function TranscriptDetails(props) {

  function goBackToPresentationDetails() {
    props.onTranscriptDetails(ScreenIds.PRESENTATION_DETAILS_SCREEN_ID);
  }

  return(
     <div>
       <h2>Transcript {props.selectedPresentations[0].name} Presentation</h2>
       <p style={{textAlign: "left", marginLeft: 40 , marginTop: 30, marginBottom: 30, marginRight: 40}}>
         {props.selectedPresentations[0].transcript}
       </p>
       <Button variant="contained" onClick={goBackToPresentationDetails}>Back To Presentation Details</Button>
     </div>
  );

  /*return(
    <div>
    <h2>Transcript " ENG 101 " Presentation</h2>
    <p style={{textAlign: "left", marginLeft: 40 , marginTop: 30, marginBottom: 30, marginRight: 40}}> ENG 101 Lesson -33
      2 Lesson – 33 (Essay Writing)
      In the past few lessons we have looked at paragraph writing. Now we shall move forward and look at longer pieces of writing which consist of several paragraphs. The problems we considered in sentence and paragraph writing are also the fundamental problems of longer composition – the same problems of unity, coherence, and emphasis. While some topics can be treated in a single paragraph others require more elaborate development. In longer compositions we
      3 find problems of arrangement
      find problems of arrangement. A longer composition, such as an essay, divides itself usually into a number of parts. In what order shall we present them? How much emphasis should be given to each fact? These are some of the problems faced in essay writing.
      Now a lot depends on the purpose of your writing. If you are writing primarily to give information, then you need to be as exact as possible in the interest of clear, logical presentation of facts. If you are writing to describe something, or to create an image or a
      4 picture then you shall perhaps put less emphasis upon accurate measurement and more upon suggestive and revealing details. If you are writing to tell a story, you will have to decide upon the point of highest interest and arrange your material carefully to give your reader the feeling or illusion of taking part in the action.
      Writing an essay is not more difficult than writing a paragraph. There is only one difference – of length. The principles of
      5 organization are the same for both: so if you can write a good paragraph, you can also write a good essay.
      Process of Writing
      Writing usually takes place in steps or stages. There are five stages or steps in the writing process. (1) Getting ideas: brainstorming, clustering & free writing (2) making brief outline (3) writing the 1st draft (4) revising (5) proof reading
      6 .
      Process of Writing: Five stages / steps
      Getting ideas: brainstorming, clustering, free writing
      making brief outline
      writing the 1st draft
      revising
      proof reading
      7 Step I: Getting Ideas: Primarily from reading, talking to people, listening to talk shows, TV programs on current issues etc.
      (a) Brainstorming – For ideas
      jot down points or ideas and their details as they come to your mind. Just write them down without putting them in any special order. Try to accumulate as many details as you can think of. This is one strategy of beginning an essay. The other strategy is
      8 (b) Clustering: here you begin by writing your subject or topic in the center of a blank sheet of paper. Then as ideas come into your mind you put them down in boxes or circles around the subject or topic. You will now see a sample of clustering.
      (c) Free writing, this is also a very useful technique. Here you just write down whatever comes into your mind about the topic. Continue writing for sometime without stopping to worry about grammar or spellings etc.
    </p>
      <Button variant="contained" onClick={goBackToPresentationDetails}>Back To Presentation Details</Button>
    </div>
  );*/
}