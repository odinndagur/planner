

import img1 from './assets/IMG_3075_1.jpg'
import img2 from './assets/IMG_5719.jpg'
import img3 from './assets/IMG_6101.jpg'
import { QuoteApp } from './x'

import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from './StrictModeDroppable'

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom: any = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };

  return custom;
});

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`;

function Image({ img, index }) {
    const imgPadding = '0.5rem'

  return (
    <Draggable draggableId={img} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img src={img} style={{maxWidth:'100%',maxHeight:'80vh',paddingTop:imgPadding,paddingBottom:imgPadding,textAlign:'center',margin:'auto'}}/>
        </div>
      )}
    </Draggable>
  );
}


const ImageList = React.memo(function ImageList({ images }) {
  return images.map((img:string,index:number) => {
    return <Image img={img} index={index} key={img}/>
  // })}
})})

function App() {
  const [state, setState] = useState({ images: [img1,img2,img3] });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const images = reorder(
      state.images,
      result.source.index,
      result.destination.index
    );

    setState({ images });
  }

  return (
    <div style={{margin:'auto',maxWidth:'600px'}}>

      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {/* <QuoteList quotes={state.quotes} /> */}
              <ImageList images={state.images} />
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
    );
}






export default App






// import { useState } from 'react'

// import FilerobotImageEditor, {
//   TABS,
//   TOOLS,
// } from 'react-filerobot-image-editor';

// function App() {
//   const [isImgEditorShown, setIsImgEditorShown] = useState(false);

//   const openImgEditor = () => {
//     setIsImgEditorShown(true);
//   };

//   const closeImgEditor = () => {
//     setIsImgEditorShown(false);
//   };

//   return (
//     <div>
//       <button onClick={openImgEditor}>Open Filerobot image editor</button>
//       {isImgEditorShown && (
//         <FilerobotImageEditor
//           source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
//           onSave={(editedImageObject, designState) =>
//             console.log('saved', editedImageObject, designState)
//           }
//           onClose={closeImgEditor}
//           annotationsCommon={{
//             fill: '#ff0000',
//           }}
//           Text={{ text: 'Filerobot...' }}
//           Rotate={{ angle: 90, componentType: 'slider' }}
//           Crop={{
//             presetsItems: [
//               {
//                 titleKey: 'classicTv',
//                 descriptionKey: '4:3',
//                 ratio: 4 / 3,
//                 // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
//               },
//               {
//                 titleKey: 'cinemascope',
//                 descriptionKey: '21:9',
//                 ratio: 21 / 9,
//                 // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
//               },
//             ],
//             presetsFolders: [
//               {
//                 titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
//                 // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
//                 groups: [
//                   {
//                     titleKey: 'facebook',
//                     items: [
//                       {
//                         titleKey: 'profile',
//                         width: 180,
//                         height: 180,
//                         descriptionKey: 'fbProfileSize',
//                       },
//                       {
//                         titleKey: 'coverPhoto',
//                         width: 820,
//                         height: 312,
//                         descriptionKey: 'fbCoverPhotoSize',
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           }}
//           tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
//           defaultTabId={TABS.ANNOTATE} // or 'Annotate'
//           defaultToolId={TOOLS.TEXT} // or 'Text'
//         />
//       )}
//     </div>
//   );
// }

// export default App
