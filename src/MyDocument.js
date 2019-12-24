import React from 'react';

import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
// add ,Image, above
// import panda from './panda.jpg';


export const Quixote = (props) => {
    
    const info = props.info;
    
    return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.header} fixed>
          ~ UE Computer Science Project in English ~
        </Text>
        <Text style={styles.title}>{info.title}</Text>
        <Text style={styles.author}>{info.firstName} {info.lastName}</Text>

        <Text style={styles.authorInMargin}>{info.firstName} {info.lastName}</Text>

        {/*
        <Image
            style={styles.image}
            src={panda}
        />
        */}
        
        <Text style={styles.subtitle}>Abstract</Text>
        <Text style={styles.text}>
          {info.abstract}
        </Text>

        <Text style={styles.subtitle}>Keywords</Text>
        <Text style={styles.text}>
          {info.keywords}
        </Text>
        
        <Text style={styles.subtitle}>References</Text>
        <Text style={styles.text}>
          {info.references}
        </Text>
        
        
      </Page>
    </Document>
  )};

  /* 
  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
  */
 
  export const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      //fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
      textTransform: 'uppercase'
    },
    authorInMargin: {
        fontSize: 12,
        textTransform: 'uppercase',
        transform: 'rotate(-90deg) translate(250px, 280px)',
        
      },

    subtitle: {
      fontSize: 18,
      margin: 12,
      //fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });
  



  //ReactPDF.render(<Quixote />);
  