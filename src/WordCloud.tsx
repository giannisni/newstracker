// // WordCloud.tsx
// import React from 'react';
// import { Wordcloud } from '@visx/wordcloud';
// import { withParentSize } from '@visx/responsive';

// interface WordData {
//   text: string;
//   value: number;
// }

// interface WordCloudProps {
//   data: WordData[];
//   width: number;
//   height: number;
// }

// const WordCloud: React.FC<WordCloudProps> = ({ data, width, height }) => {
//   return (
//     <svg width={width} height={height}>
//       <Wordcloud
//         words={data}
//         width={width}
//         height={height}
//         font="Arial"
//         fontSize={({ datum }) => datum.value}
//         rotate={() => (Math.random() - 0.5) * 30}
//       >
//         {cloud => cloud.words ? cloud.words.map(word => (
//           <text
//             key={word.text}
//             fontSize={word.size}
//             textAnchor="middle"
//             transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
//           >
//             {word.text}
//           </text>
//         )) : null}
//       </Wordcloud>
//     </svg>
//   );
// };

// export default withParentSize(WordCloud);
