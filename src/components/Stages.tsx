import React, { useState,useEffect } from "react";

import Progress from '../components/Progress';

import tntTitan10AImg from '../img/tntTitan10A.png';
import tntTitan20AImg from '../img/tntTitan20A.png';
import winpatsImg from '../img/winpats.png';
import tabletImg from '../img/tablet.png';
import printKitImg from '../img/printKit.png';
import testAccImg from '../img/testAcc.png';
import basicTagsImg from '../img/basicTags.png';
import proTagsImg from '../img/proTags.png';

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
  imgsrc: tntTitan10AImg,
  name: "The TnT Titan 10A",
  price: 1234,
};
const tntTitan20A: TesterEntity = {
  id: "tester-titan-20a",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: tntTitan20AImg,
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
  imgsrc: winpatsImg,
  name: "WinPATS",
  price: 1234,
};
const tablet: SoftwareEntity = {
  id: "software-tablet",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: tabletImg,
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
  imgsrc: printKitImg,
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
  imgsrc: testAccImg,
  name: "Testing Accessories Pack",
  price: 1234,
};
const basicTags: ExtrasEntity = {
  id: "extras-basic-tags",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: basicTagsImg,
  name: "Getting Started Tag Pack",
  price: 1234,
};
const proTags: ExtrasEntity = {
  id: "extras-pro-tags",
  bulletPoints: ["list item 1", "list item 2", "list item 3"],
  imgsrc: proTagsImg,
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



//Determine which stage to display
function Stages() {
  //Set the default stage
  let currentStage: StageName = StageName.Tester;
  //Hook for updating the stages
  const [stage, setStage] = useState(currentStage);

  //Hooks for updating product selections.
  //Note that some selections are X OR Y (testers),
  // while others are X AND/OR Y (accessories and tags).
  const [testerSelected, setTesterSelected] = useState('unset');
  const [winpatsSelected, setWinpatsSelected] = useState('unset');
  const [tabletSelected, setTabletSelected] = useState('unset');
  const [printKitSelected, setPrintKitSelected] = useState('unset');
  const [testAccSelected, setTestAccSelected] = useState('unset');
  const [basicTagsSelected, setBasicTagsSelected] = useState('unset');
  const [proTagsSelected, setProTagsSelected] = useState('unset');

  // Components to construct the stages
  function BulletPoints({bulletPoints}) {
    return (
      <ul className="builder-option-list">
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
      <div className={className} onClick={handleClick}>
        <div className="builder-option-image">
          <img src={imgsrc} alt={name} />
        </div>
        <div className="builder-option-description">
          <p className="builder-option-title">{name}</p>
          <p className="builder-option-price">${price}<sup>+GST</sup></p>
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
  function Summary() {
    function SummaryLineItem(props) {
      if (props.item !== "unset") {
        return (
          <div className="builder-options-review-item">
            <p>{props.object.name}</p>
            <p>${props.object.price}<sup>+GST</sup></p>
          </div>
        )
      }
    };
    function SummarySection(props) {
      if (props.sectionTitle === "Tester") {
        if (props.tester === "The TnT Titan 10A") {
          return (
            <>
              <div className="builder-options-review-heading">
                <p>{props.sectionTitle}</p>
              </div>
              <SummaryLineItem item={props.tester} object={tntTitan10A}/>
            </>
          );
        } else {
          return (
            <>
              <div className="builder-options-review-heading">
                <p>{props.sectionTitle}</p>
              </div>
              <SummaryLineItem item={props.tester} object={tntTitan20A}/>
            </>
          );
        }
      } else if (props.sectionTitle === "Software") {
          if (props.winpats === 'unset' && props.tablet === 'unset' ) {}
          else {
            return(
              <>
                <div className="builder-options-review-heading">
                  <p>{props.sectionTitle}</p>
                </div>
                <SummaryLineItem item={props.winpats} object={winpats}/>
                <SummaryLineItem item={props.tablet} object={tablet}/>
              </>
            );
          }
      } else if (props.sectionTitle === "Print Kit") {
        if (props.printKit === 'unset') {}
        else {
          return(
            <>
              <div className="builder-options-review-heading">
                <p>{props.sectionTitle}</p>
              </div>
              <SummaryLineItem item={props.printKit} object={printKit}/>
            </>
          );
        }
      } else if (props.sectionTitle === "Extras") {
          if (
            props.testAcc === 'unset' &&
            props.basicTags === 'unset' &&
            props.proTags === 'unset') {}
          else {
            return(
              <>
                <div className="builder-options-review-heading">
                  <p>{props.sectionTitle}</p>
                </div>
                <SummaryLineItem item={props.testAcc}   object={testAcc}/>
                <SummaryLineItem item={props.basicTags} object={basicTags}/>
                <SummaryLineItem item={props.proTags}   object={proTags}/>
              </>
            );
          }
      }
    };
    function SummaryTotal(props) {
      function priceCheck(property, total, item) {
        if (property !== 'unset') {
          let total = item.price;
        } else {
          let total = 0;
        }
      };
      function OrderTotal() {
        let orderTotal =
          (testerSelected === "The TnT Titan 10A" ? tntTitan10A.price : tntTitan20A.price) +
          (winpatsSelected !== "unset"  ? winpats.price : 0) +
          (tabletSelected !== "unset"  ? tablet.price : 0) +
          (printKitSelected !== "unset"  ? printKit.price : 0) +
          (testAccSelected !== "unset"  ? testAcc.price : 0) +
          (basicTagsSelected !== "unset"  ? basicTags.price : 0) +
          (proTagsSelected !== "unset"  ? proTags.price : 0);
        return (
          <div className="builder-options-review-total">
            <p>Total</p>
            <p>${orderTotal}<sup>+GST</sup></p>
          </div>
        );
      }

      return(
        <OrderTotal />
      );
    }
    return (
      <div className="builder-options-review">
        <SummarySection sectionTitle="Tester" tester={testerSelected} />
        <SummarySection sectionTitle="Software" winpats={winpatsSelected} tablet={tabletSelected}/>
        <SummarySection sectionTitle="Print Kit" printKit={printKitSelected}/>
        <SummarySection sectionTitle="Extras" testAcc={testAccSelected} basicTags={basicTagsSelected} proTags={proTagsSelected}/>
        <SummaryTotal tester={testerSelected} winpats={winpatsSelected} tablet={tabletSelected} printKit={printKitSelected} testAcc={testAccSelected} basicTags={basicTagsSelected} proTags={proTagsSelected}/>
      </div>
    )
  }

  //Set which stage to display based on 'stage' counter - see the hook above.
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
         <Progress stage={stage}/>
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
         <Progress stage={stage}/>
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
             handleClick={() => printKitSelected === printKit.name ? (setPrintKitSelected('unset'), setProTagsSelected('unset'))  : (setPrintKitSelected(printKit.name), setBasicTagsSelected('unset'))}
             optionSelected={printKitSelected === printKit.name}
            />
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
        <Stage
          stageName={"Review"}
          headerTitle={"Review your order"}
          headerSubtitle={"When you are satisfied with your order, click submit to add your selections to your cart. You can then proceed to checkout, or continue shopping."}
        >
          <Summary />
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

  //Handle navigation. GoBack is straightforward - it returns you to the
  //previous stage. GoForward sometimes requires a selection to be made before
  //proceeding, but works the same way (decrementing/incrementing 'stage')
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
  function MessageHandler() {
    if (testerSelected === 'unset') {
        return(
          <p> Please select a tester to proceed</p>
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
            <button
              className="button-link inactive"
              inactive="true"
            >
              Next
            </button>
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
      function handleSubmit() {
        let sendToCart =
          "https://www.wavecom.com.au/order_process_01_cart_view.php?" +
          (testerSelected === "The TnT Titan 10A" ? "id_product=1320&cart_action=add" : "id_product=1321&cart_action=add") +
          (winpatsSelected    !== "unset"  ? "&id_product=1306&cart_action=add" : "") +
          (tabletSelected     !== "unset"  ? "&id_product=1357&cart_action=add" : "") +
          (printKitSelected   !== "unset"  ? "&id_product=1355&cart_action=add" : "") +
          (testAccSelected    !== "unset"  ? "&id_product=63&cart_action=add" : "") +
          (basicTagsSelected  !== "unset"  ? "&id_product=1068&cart_action=add" : "") +
          (proTagsSelected    !== "unset"  ? "&id_product=1076&cart_action=add" : "");
          return (sendToCart);
      }
      console.log(handleSubmit())
      return(
        <a
          className="button-link"
          href={() => handleSubmit()}
        >
          Submit
        </a>
      );
    }
    else {
      return("Something went wrong - please reload this page");
    }
  }

  //Component build for navigation
  function Navigation() {
    return(
      <div className="builder-navigate">
        <div className="builder-navigate-backward">
          <GoBackHandler />
        </div>
        <div className="builder-navigate-message">
          <MessageHandler />
        </div>
        <div className="builder-navigate-forward">
          <GoForwardHandler />
        </div>
      </div>
    );
  }

  //Return the stage, navigation and progress components.
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
