import React, { useState,useEffect } from "react";

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
  id: "tester-titan-10a",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: "/",
  name: "The TnT Titan 10A",
  price: 1234,
};
const tntTitan20A: TesterEntity = {
  id: "tester-titan-20a",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: "/",
  name: "The TnT Titan 20A",
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

const printKitEntities = {
  [printKit.id]: printKit,
};

const printKitIds = [printKit.id];

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

const extrasIds = [testAcc.id, basicTags.id, proTags.id];

let selectedExtrasIds: string[] = [];

//---------------------------------------------------------------------------

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


// Components to construct the stages
function BulletPoints({bulletPoints}) {
  return (
    <ul className="builder-option-description">
      {bulletPoints.map(bulletPoint => {
        return <li key={bulletPoint}>{bulletPoint}</li>;
      })}
    </ul>
  );
}

function Option({ optionId, name, imgsrc, price, bulletPoints, handleClick, optionSelected }) {
  let className = "builder-option";
  if (optionSelected) {
    className += ' selected'
  }
  return(
    <div className={className} id={optionId} onClick={handleClick}>
      <div className="builder-option-image">
        <img src={imgsrc} alt={name} />
      </div>
      <div className="builder-option-description">
        <p className="builder-option-title">{name}</p>
        <p className="builder-option-price">{price}</p>
        <BulletPoints bulletPoints={bulletPoints} />
      </div>
    </div>
  );
}

function Stage({ headerTitle, headerSubtitle, stageName, children }) {
  return(
    <div  className="builder-stage-container">
      <div className="builder-title">
        <h3>{headerTitle}</h3>
        <p>{headerSubtitle}</p>
      </div>
      <div id={stageName} className="builder-stage">
        {children}
      </div>
    </div>
  );
};

//Determine which stage to display
function Stages() {
  let currentStage: StageName = StageName.Tester;
  const [stage, setStage] = useState(currentStage);

  const [testerSelected, setTesterSelected] = useState('unset');
  const [winpatsSelected, setWinpatsSelected] = useState('unset');
  const [tabletSelected, setTabletSelected] = useState('unset');
  const [printKitSelected, setPrintKitSelected] = useState('unset');
  const [testAccSelected, setTestAccSelected] = useState('unset');
  const [basicTagsSelected, setBasicTagsSelected] = useState('unset');
  const [proTagsSelected, setProTagsSelected] = useState('unset');


  function CheckStage() {
    if (stage === StageName.Tester) {
       return(
         <Stage
          stageName={StageName.Tester}
          headerTitle={testerStageText.header}
          headerSubtitle={testerStageText.subtitle}
        >
        <div className="builder-options-container">
          <Option
           optionId={tntTitan10A.id}
           name={tntTitan10A.name}
           price={tntTitan10A.price}
           imgsrc={tntTitan10A.imgsrc}
           bulletPoints={tntTitan10A.bulletPoints}
           handleClick={() => setTesterSelected(tntTitan10A.name)}
           optionSelected={testerSelected === tntTitan10A.name}
          />
          <Option
           optionId={tntTitan20A.id}
           name={tntTitan20A.name}
           price={tntTitan20A.price}
           imgsrc={tntTitan20A.imgsrc}
           bulletPoints={tntTitan20A.bulletPoints}
           handleClick={() => setTesterSelected(tntTitan20A.name)}
           optionSelected={testerSelected === tntTitan20A.name}
          />
        </div>
         <Navigation />
         <Progress stage={stage} optionselected={testerSelected}/>
        </Stage>
       )
    } else if (stage === StageName.Software) {
      return(
        <Stage
          stageName={StageName.Software}
          headerTitle={softwareStageText.header}
          headerSubtitle={softwareStageText.subtitle}
         >
         <div className="builder-options-container">
           <Option
            id={winpats.id}
            name={winpats.name}
            price={winpats.price}
            imgsrc={winpats.imgsrc}
            bulletPoints={winpats.bulletPoints}
            handleClick={() => winpatsSelected === winpats.name ? setWinpatsSelected('unset') : setWinpatsSelected(winpats.name)}
            optionSelected={winpatsSelected === winpats.name}
           />
           <Option
            id={tablet.id}
            name={tablet.name}
            price={tablet.price}
            imgsrc={tablet.imgsrc}
            bulletPoints={tablet.bulletPoints}
            handleClick={() => tabletSelected === tablet.name ? setTabletSelected('unset') : setTabletSelected(tablet.name)}
            optionSelected={tabletSelected === tablet.name}
           />
         </div>
         <Navigation />
         <Progress stage={stage} optionselected={winpatsSelected, tabletSelected} />
        </Stage>
      )
    } else if (stage === StageName.PrintKit) {
      return(
        <Stage
          stageName={StageName.PrintKit}
          headerTitle={printKitStageText.header}
          headerSubtitle={printKitStageText.subtitle}
        >
          <div className="builder-options-container">
            <Option
             id={printKit.id}
             name={printKit.name}
             price={printKit.price}
             imgsrc={printKit.imgsrc}
             bulletPoints={printKit.bulletPoints}
             handleClick={() => printKitSelected === printKit.name ? setPrintKitSelected('unset') : setPrintKitSelected(printKit.name)}
             optionSelected={printKitSelected === printKit.name}
            />
          </div>
          <Navigation />
          <Progress stage={stage} optionselected={printKitSelected}/>
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
          <Option
           id={testAcc.id}
           name={testAcc.name}
           price={testAcc.price}
           imgsrc={testAcc.imgsrc}
           bulletPoints={testAcc.bulletPoints}
           handleClick={() => testAccSelected === testAcc.name ? setTestAccSelected('unset') : setTestAccSelected(testAcc.name)}
           optionSelected={testAccSelected === testAcc.name}
          />
          {printKitSelected === printKit.name ?
            (
              <Option
               id={proTags.id}
               name={proTags.name}
               price={proTags.price}
               imgsrc={proTags.imgsrc}
               bulletPoints={proTags.bulletPoints}
               handleClick={() => proTagsSelected === proTags.name ? setProTagsSelected('unset') : setProTagsSelected(proTags.name) + setBasicTagsSelected('unset')}
               optionSelected={proTagsSelected === proTags.name}
              />
            ) : (
              <Option
               id={basicTags.id}
               name={basicTags.name}
               price={basicTags.price}
               imgsrc={basicTags.imgsrc}
               bulletPoints={basicTags.bulletPoints}
               handleClick={() => basicTagsSelected === basicTags.name ? setBasicTagsSelected('unset') : setBasicTagsSelected(basicTags.name) + setProTagsSelected('unset')}
               optionSelected={basicTagsSelected === basicTags.name}
              />
            )
          }
        </div>
        <Navigation />
        <Progress stage={stage}/>
       </Stage>
      )
    } else if (stage === 4) {
       return(
        <Stage>
        <div>
          <h3>Review your order</h3>
          <p>
            <strong>Tester:</strong> {testerSelected}
          </p>
          <p>
            <strong>Software:</strong> {winpatsSelected}, {tabletSelected}
          </p>
          <p>
            <strong>Print Kit:</strong> {printKitSelected}
          </p>
          <p>
            <strong>Accessories:</strong> {testAccSelected}, {basicTagsSelected}, {proTagsSelected}
          </p>
        </div>
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

  function GoBackHandler() {
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

  function GoForwardHandler() {
    if (stage === 0 ) {
      if (testerSelected !== 'unset') {
        return(
          <button
            className="button-link"
            onClick={() => setStage(stage + 1)}
          >
            Next
          </button>
        );
      } else {
        return(
          <>
            <p> Please select a tester</p>
            <button
              className="button-link inactive"
              inactive="true"
            >
              Next
            </button>
          </>
        );
      }
    }
    else if (stage === 1) {
      return(
        <button
          className="button-link"
          onClick={() => setStage(stage + 1)}
        >
          Next
        </button>
    );
    }
    else if (stage === 2) {
      return(
        <button
          className="button-link"
          onClick={() => setStage(stage + 1)}
        >
          Next
        </button>
    );
    }
    else if (stage === 3) {
      return(
        <button
          className="button-link"
          onClick={() => setStage(stage + 1)}
        >
          Next
        </button>
    );
    }
    else if (stage === 4) {
      return(
        <button
          className="button-link"
          onClick={() => console.log("Submit")}
        >
          Submit
        </button>
      );
    }
    else {
      return("Something went wrong - please reload this page");
    }
  }

  function Navigation() {
    return(
      <div className="builder-navigate">
      <div className="builder-navigate-backward">
        <GoBackHandler />
      </div>
        <div>
        </div>
        <div className="builder-navigate-forward">
          <GoForwardHandler />
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
