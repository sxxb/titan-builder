import React, { useState,useEffect } from "react";

import Option from '../components/Option'
import Progress from '../components/Progress'

// @ts-check

// Type safety
interface TesterEntity {
  id: string;
  name: string;
  // In AUD.
  price: number;
  imgsrc: string;
  bulletPoints: string[];
}

const tntTitan10A: TesterEntity = {
  id: "tester-10a",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: "/",
  name: "TnT Tital 10A",
  price: 1234,
};
const tntTitan20A: TesterEntity = {
  id: "tester-20a",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: "/",
  name: "TnT Tital 20A",
  price: 2345,
};

// We store the testers in an object so we can immediately find a tester by ID,
// by just 'testers[id]'.
const testerEntities = {
  [tntTitan10A.id]: tntTitan10A,
  [tntTitan20A.id]: tntTitan20A,
};

// We store the ID of each tester in a string, so we can quickly count
// how many testers we have, or provide a list of IDs to a function that
// renders a list, so the actual rendering part only requires the ID,
// but accesses the testerEntities object when it needs more.
// And! So when someone selects a product, we just add the tester ID to a list,
// instead of the whole product object.
const testerIds = [tntTitan10A.id, tntTitan20A.id];

// Storage of selected testers
let selectedTesterIds: string[] = [];

//---------------------------------------------------------------------------

interface SoftwareEntity {
  id: string;
  name: string;
  price: number;
  imgsrc: string;
  bulletPoints: string[];
}

const winpats: SoftwareEntity = {
  id: "software-winpats",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: "/",
  name: "WinPATS",
  price: 1234,
};
const tablet: SoftwareEntity = {
  id: "software-tablet",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: "/",
  name: "Android Tablet",
  price: 1234,
};

const softwareEntities = {
  [winpats.id]: winpats,
  [tablet.id]: tablet,
};

const softwareIds = [winpats.id, tablet.id];

let selectedSoftwareIds: string[] = [];

//---------------------------------------------------------------------------

interface KitEntity {
  id: string;
  name: string;
  price: number;
  imgsrc: string;
  bulletPoints: string[];
}

const printKit: KitEntity = {
  id: "printer-kit",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: "/",
  name: "Tag Printing Kit",
  price: 1234,
};

const kitEntities = {
  [printKit.id]: printKit,
};

const kitIds = [printKit.id];

let selectedKitIds: string[] = [];

//---------------------------------------------------------------------------

interface ExtrasEntity {
  id: string;
  name: string;
  price: number;
  imgsrc: string;
  bulletPoints: string[];
}

const testAcc: ExtrasEntity = {
  id: "extras-accessories",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: "/",
  name: "Testing Accessories Pack",
  price: 1234,
};
const basicTags: ExtrasEntity = {
  id: "extras-basic-tags",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: "/",
  name: "Getting Started Tag Pack",
  price: 1234,
};
const proTags: ExtrasEntity = {
  id: "extras-pro-tags",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: "/",
  name: "Professional Printable Tag Pack",
  price: 1234,
};

const extrasEntities = {
  [testAcc.id]: testAcc,
  [basicTags.id]: basicTags,
  [proTags.id]: proTags,
};

const extrasIds = [printKit.id, printKit.id, printKit.id];

let selectedExtrasIds: string[] = [];


// Data type for what stage we are in
enum StageName {
  Tester,
  Software,
  PrintKit,
  Extras,
}

// Type safety
interface StageText {
  header: String;
  subtitle: String;
}

// All the page text not specific to an entity/product
const testerStageText: StageText = {
  header: "Tester",
  subtitle: "Select your current capacity",
};
const softwareStageText: StageText = {
  header: "Software",
  subtitle: "Add WinPATS & a Tablet to get the most out of your tester",
};
const printKitStageText: StageText = {
  header: "Tag Printing Kit",
  subtitle: "Print long lasting tags with a barcode to make test and tagging quicker and easier than ever before",
};
const extrasStageText: StageText = {
  header: "Extras",
  subtitle: "Choose any optional extras for your tester",
};

function TesterOptions() {
    return(
      <>
        <Option
         id={tntTitan10A.id}
         name={tntTitan10A.name}
         price={tntTitan10A.price}
         imgsrc={tntTitan10A.imgsrc}
         bulletPoints={tntTitan10A.bulletPoints}
        />
        <Option
         id={tntTitan20A.id}
         name={tntTitan20A.name}
         price={tntTitan20A.price}
         imgsrc={tntTitan20A.imgsrc}
         bulletPoints={tntTitan20A.bulletPoints}
        />
      </>
    )
}

function SoftwareOptions() {
    return(
      <>
        <Option
         id={winpats.id}
         name={winpats.name}
         price={winpats.price}
         imgsrc={winpats.imgsrc}
         bulletPoints={winpats.bulletPoints}
        />
        <Option
         id={tablet.id}
         name={tablet.name}
         price={tablet.price}
         imgsrc={tablet.imgsrc}
         bulletPoints={tablet.bulletPoints}
        />
      </>
    )
}

function PrintKitOptions() {
    return(
      <>
        <Option
         id={printKit.id}
         name={printKit.name}
         price={printKit.price}
         imgsrc={printKit.imgsrc}
         bulletPoints={printKit.bulletPoints}
        />
      </>
    )
}

function ExtrasOptions() {
    return(
      <>
        <Option
         id={testAcc.id}
         name={testAcc.name}
         price={testAcc.price}
         imgsrc={testAcc.imgsrc}
         bulletPoints={testAcc.bulletPoints}
        />
        <Option
         id={basicTags.id}
         name={basicTags.name}
         price={basicTags.price}
         imgsrc={basicTags.imgsrc}
         bulletPoints={basicTags.bulletPoints}
        />
        <Option
         id={proTags.id}
         name={proTags.name}
         price={proTags.price}
         imgsrc={proTags.imgsrc}
         bulletPoints={proTags.bulletPoints}
        />
      </>
    )
}

function Stage(props) {
  return(
    <div  className="builder-stage-container">
      <div className="builder-title">
        <h3>{props.headerTitle}</h3>
        <p>{props.headerSubtitle}</p>
      </div>
      <div id={props.stageName} className="builder-stage">
        {props.children}
      </div>
    </div>
  );
};

// Store what stage we are in.
// The UI handler should take this stage and determine what to display
// eg if (stage == 0) { display testerEntities }
// // Control whether a stage can be changed or not
// function nextStage() {
//   if (currentStage === StageName.Tester) {
//     // If the array of selected testers has a length that is not falsy (positive number)
//     if (!!selectedTesterIds.length) {
//       // Move on to the next stage
//       currentStage = StageName.Software;
//     } else {
//       // display error, you need to pick a tester first!
//       // But also, the UI should have the next button disabled
//       // until selectedTesterIds has a non zero length.
//     }
//   }
// }
//

//Determine which stage to display
function Stages() {
  let currentStage: StageName = StageName.Tester;
  const [stage, setStage] = useState(currentStage);

  function CheckStage() {
    if (stage === StageName.Tester) {
       return(
         <Stage
          stageName={StageName.Tester}
          headerTitle={testerStageText.header}
          headerSubtitle={testerStageText.subtitle}
        >
        <div className="builder-options-container">
          <TesterOptions/>
        </div>
         <Navigation />
         <Progress stage={stage}/>
        </Stage>
       )
        // onClick, toggle whether testerId is in the selectedTesterIds array
        // display a border around this if selectedTesterIds.contains(testerId)
    } else if (stage === StageName.Software) {
      return(
        <Stage
          stageName={StageName.Software}
          headerTitle={softwareStageText.header}
          headerSubtitle={softwareStageText.subtitle}
         >
         <div className="builder-options-container">
          <SoftwareOptions/>
         </div>
         <Navigation />
         <Progress stage={stage} />
        </Stage>
      )
      // for (const softwareId in softwareIds) {
      //
      // }
    } else if (stage === StageName.PrintKit) {
      return(
        <Stage
          stageName={StageName.PrintKit}
          headerTitle={printKitStageText.header}
          headerSubtitle={printKitStageText.subtitle}
        >
          <div className="builder-options-container">
            <PrintKitOptions/>
          </div>
          <Navigation />
          <Progress stage={stage}/>
        </Stage>
     )
    } else if (stage === StageName.Extras) {
      return(
       <Stage
        stageName={StageName.Extras}
        headerTitle={extrasStageText.header}
        headerSubtitle={extrasStageText.subtitle}
        >
        <div className="builder-options-container">
          <ExtrasOptions/>
        </div>
        <Navigation />
        <Progress stage={stage}/>
       </Stage>
      )
      // for (const extrasId in extrasIds) {
      //
      // }
    } else if (stage === 4) {
       return(
        <Stage>
        <div><h3>Review your order</h3></div>
         <Navigation />
         <Progress stage={stage}/>
        </Stage>
       )
       // for (const extrasId in extrasIds) {
       //
       // }
    } else if (stage === undefined) {
      return("Something went wrong - please reload this page.")
    }
    else {
      return("Something went wrong - please reload this page.")
    }
  };

  function GoBack() {
    if (stage > 0 ) {
      return(
        <button
          className="button-link"
          onClick={() => setStage(stage - 1)}
        >
          Back
        </button>
      );
    }
  }

  function GoForward() {
    if (stage < 4 ) {
      return(
        <button
          className="button-link"
          onClick={() => setStage(stage + 1)}
        >
          Next
        </button>
      );
    } else if (stage === 4 ) {
      return(
        <button
          className="button-link"
          onClick={() => console.log("Submit")}
        >
          Submit
        </button>
      );
    }
  }

  function Navigation() {
    return(
      <div className="builder-navigate">
      <div className="builder-navigate-backward">
        <GoBack />
      </div>
        <div>
        </div>
        <div className="builder-navigate-forward">
          <GoForward />
        </div>
      </div>
    );
  }

  useEffect(() => {
    return () => {
      <>
      <CheckStage />
      <Navigation />
      <Progress />
      </>
    }
  });

  return (
    <CheckStage />
  );
}

export default Stages;
