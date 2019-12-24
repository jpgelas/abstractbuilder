import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { PDFDownloadLink } from '@react-pdf/renderer';
//import { PDFViewer } from '@react-pdf/renderer';
import { Quixote } from './MyDocument.js';

import './App.css';

function App() {

  const { register, handleSubmit, errors } = useForm()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [info, setInfo] = useState({})

  const [title, setTitle] = useLocalStorage('title', '');
  const [firstName, setFirstName] = useLocalStorage('firstName', '');
  const [lastName, setLastName] = useLocalStorage('lastName', '');
  const [abstract, setAbstract] = useLocalStorage('abstract', '');
  const [keywords, setKeywords] = useLocalStorage('keywords', '');
  const [references, setReferences] = useLocalStorage('references', '');


  const onSubmit = data => {
    setInfo(data)
    setIsSubmitted(true)
  }
  //console.log(watch('example')) // watch input value by passing the name of it

  const DownloadLink = (props) => {
    return (
      <div className="downloadLink">
        <PDFDownloadLink document={<Quixote info={props.info}/>} fileName="somename.pdf">
          { ({ blob, url, loading, error }) =>
            (loading ? <p>'Building document...'</p> : "Download now! ⬇️")}
        </PDFDownloadLink>
      </div>
    )
  }
  
  // Hook
  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }


  return (
    <div className="App">
      <h1>Abstract builder</h1>
      <p>This tool helps students to generate a clean PDF page with their Abstract.
        Everything run on client side (<i>i.e.</i> in your browser).
        DO NOT FORGET to upload your builded PDF file to &nbsp;
        <a href="https://tomuss.univ-lyon1.fr/">Tomuss</a>.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label htmlFor="title" className="required">Title</label>
          <input name="title" placeholder="Enter your title here" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            ref={register({ required: true })} />
          {errors.title && <p>This field is required</p>}
         
        </div>

        <div>
          <label htmlFor="firstName" className="required">First Name</label>
          <input name="firstName" placeholder="Enter your first name here" 
            value={firstName} 
            onChange={e => setFirstName(e.target.value)}
            ref={register({ required: true })} />
          {errors.firstName && <p>This field is required</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="required">Last Name</label>
          <input name="lastName" placeholder="Enter your last name here" 
            value={lastName} 
            onChange={e => setLastName(e.target.value)}
            ref={register({ required: true })} />
          {errors.lastName && <p>This field is required</p>}
        </div>

        <div>
          <label htmlFor="abstract" className="required">Abstract</label>
          <textarea name="abstract" placeholder="Here is your abstract..."
            rows="20"
            value={abstract} 
            onChange={e => setAbstract(e.target.value)}
            ref={register({ required: true })} >
          </textarea>
          {errors.abstract && <p>This field is required</p>}
        </div>

        <div>
          <label htmlFor="keywords">Keywords</label>
          <input name="keywords" placeholder="computer science ; banana ; kangaroo"
            value={keywords} 
            onChange={e => setKeywords(e.target.value)}
            ref={register} />
        </div>


        <div>
          <label htmlFor="references">References</label>
          <textarea name="references"
            placeholder="[1] Blah of north, Andrew Morton, 1986&#10;[2] Life is beautiful, Ken Dunhill, 2017"
            rows="5"
            value={references} 
            onChange={e => setReferences(e.target.value)}
            ref={register} >
          </textarea>
        </div>

        <input type="submit" value={isSubmitted ? "re-build PDF" : "Build PDF"} />
        {isSubmitted && localStorage.setItem('title', title.value) }
        {isSubmitted ? <DownloadLink info={info}/> : <p className="downloadLink">Link not yet available</p>}
        
      </form>
      <br/>
      <br/>
      <br/>

    </div >
  );
}

export default App;
