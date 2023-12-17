'use client';

import { Button } from '@/app/ui/components/button';
import { CardHeader, Card } from '@/app/ui/components/card';
import { useFireproof } from 'use-fireproof';
import { useRef, useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';

export default function Groupdetails({ groupname }) {
  const { database, useLiveQuery, useDocument } = useFireproof(
    `secret-santa-${groupname}`,
  );
  // let myuuid = uuidv4();
  let [uuid,setuuid]=useState(uuidv4());
  const [doc, setDoc, saveDoc] = useDocument({
    name: '',
    address: '',
    wishitem1: '',
    wishitem2: '',
    wishitem3: '',
    assignedid: '',
    randomid: uuid,
    date: Date.now(),
    type: 'names',
  });
  const groupdetails = useLiveQuery('limit').docs;
  const groupdata = useLiveQuery('name').docs;
  const itemsRef = useRef([]);
  const [assignednames, setassignednames] = useState(false);

  const [hasExecutedCode, setHasExecutedCode] = useState(false);

  useEffect(() => {
    if (assignednames) {
      itemsRef.current.map((element) => {
        console.log(element);
        element
          .querySelector('div > div > h3')
          .addEventListener('click', async (e) => {
            let docname = e.srcElement.innerText;
            // console.log('This is the name that was clicked', docname);
            alert(`${docname} has been clicked!`);
            // const doc = await database.query(doc => {
            //   if (doc.name === docname) return doc
            // })
            // console.log("This is the returned doc",doc);
            
            // console.log('This is the document that was clicked',result1)
            // console.log(result.rows[0].doc, 'The list returned');
            // let address = result.rows[0].doc.address;
            // let item1 = result.rows[0].doc.wishitem1;
            // let item2 = result.rows[0].doc.wishitem2;
            // let item3 = result.rows[0].doc.wishitem3;
            // alert(
            //   `Your name for secret santa is ${other} with address ${address} and wishitems as ${item1}, ${item2} and ${item3}`,
            // );
          });
      });
    }
  }, [assignednames]);

  async function handlebtnclick() {
    let ids = groupdata.map((element) => {
      return element._id;
    });

    //Now that we have the names array the next step is to shuffle the array
    if (groupdata.length === limit) {
      let duplicateids = ids.slice();
      for (let i = limit; i--; i > 0) {
        let randomnumber = Math.floor(Math.random() * i);
        //If i=3, then the randomnumber will have the values either 0,1 or 2
        let temp = duplicateids[i];
        duplicateids[i] = duplicateids[randomnumber];
        duplicateids[randomnumber] = temp;
      }

      console.log('This is the original array', ids);
      console.log('This is the duplicate array', duplicateids);

      //Now that we have the names and the duplicate names, the next step is to update the documents of the names
      const docs = await database.query((doc) => {
        if (doc.type === 'names') return doc.name;
      });

      for (let j = 0; j < ids.length; j++) {
        let document = docs.rows[j];
        document.doc.assignedid = duplicateids[j];
        // console.log(document);
        const updateddocument = await database.put(document);
      }

      console.log('Docs after they are updated', docs);
      setassignednames(true);

      //Now we assign event listeners to the names
      //  itemsRef.current.map((element) => {
      // console.log(element);
      // let name = element.querySelector('div > div > h3').innerText;
      // element
      //   .querySelector('div > div > h3')
      //   .addEventListener('click', (e) => {
      //     alert("Ok!!")
      // async function querydata() {
      //   const result = await database.query(
      //     (doc) => {
      //       if (doc.name == other) return doc.name;
      //     },
      //     { key: other },
      //   );
      //   console.log(result.rows[0].doc, 'The list returned');
      //   let address = result.rows[0].doc.address;
      //   let item1 = result.rows[0].doc.wishitem1;
      //   let item2 = result.rows[0].doc.wishitem2;
      //   let item3 = result.rows[0].doc.wishitem3;
      //   alert(
      //     `Your name for secret santa is ${other} with address ${address} and wishitems as ${item1}, ${item2} and ${item3}`,
      //   );
      // }
      // querydata();
      // alert(`Your secret santa is ${other}`)
      //     });
      // });
    }

    //   for (let j = 0; j < names.length; j++) {
    //     let document = await database.query(
    //       (doc) => {
    //         if (doc.name == names[j]) return doc.name;
    //       },
    //       { key: names[j] },
    //     );
    //     console.log('These are the documents', document);
    //   }
    // }

    // if (groupdata.length === limit) {
    //   const shuffledNames = names.slice(); // Create a copy of the original names array
    //   let assignments = {};

    //   // Fisher-Yates shuffle algorithm
    //   for (let i = shuffledNames.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [shuffledNames[i], shuffledNames[j]] = [
    //       shuffledNames[j],
    //       shuffledNames[i],
    //     ];
    //   }

    //   for (let i = 0; i < names.length; i++) {
    //     let currentName = names[i];
    //     let assignedName;

    //     do {
    //       if (shuffledNames.length === 0) {
    //         console.error('Not enough names to assign uniquely');
    //         alert('Try again! Sometimes the random function fails');
    //         return;
    //       }
    //       assignedName = shuffledNames.pop(); // Assign the last name from shuffled array
    //     } while (
    //       assignedName === currentName ||
    //       assignments[currentName] === assignedName
    //     );

    //     assignments[currentName] = assignedName;
    //   }
    //   alert('Successful');
    //   console.log('These are the assignments', assignments);
    //   itemsRef.current.map((element) => {
    //     console.log(element);
    //     let name = element.querySelector('div > div > h3').innerText;
    //     element
    //       .querySelector('div > div > h3')
    //       .addEventListener('click', (e) => {
    //         let name = e.srcElement.innerText;
    //         let other = assignments[name];
    //         // async function querydata() {
    //         //   const result = await database.query(
    //         //     (doc) => {
    //         //       if (doc.name == other) return doc.name;
    //         //     },
    //         //     { key: other },
    //         //   );
    //         //   console.log(result.rows[0].doc, 'The list returned');
    //         //   let address = result.rows[0].doc.address;
    //         //   let item1 = result.rows[0].doc.wishitem1;
    //         //   let item2 = result.rows[0].doc.wishitem2;
    //         //   let item3 = result.rows[0].doc.wishitem3;
    //         //   alert(
    //         //     `Your name for secret santa is ${other} with address ${address} and wishitems as ${item1}, ${item2} and ${item3}`,
    //         //   );
    //         // }
    //         // querydata();
    //         alert(`Your secret santa is ${other}`)
    //       });
    //   });
    // }
    else {
      alert('The group is not full yet');
    }
  }

  let limit;
  const elements = [];

  if (groupdetails[0]) {
    limit = parseInt(groupdetails[0].limit);

    for (let i = 0; i < limit; i++) {
      let displayvalue = '';
      if (groupdata[i]) {
        displayvalue = groupdata[i].name;
      } else {
        displayvalue = 'No name added yet!';
      }
      elements.push(
        <Card key={`card-${i}`} ref={(el) => (itemsRef.current[i] = el)}>
          <CardHeader className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{displayvalue}</h3>
            <DotIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
        </Card>,
      );
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-800">
      <div className="flex w-64 flex-col">
        <div className="flex h-0 flex-1 flex-col bg-gray-900">
          <div className="relative z-0 flex flex-1 overflow-y-auto">
            <div className="flex w-full flex-col justify-between py-6">
              <div className="flex-1 space-y-1 px-2">
                <h2 className="text-center text-lg font-semibold text-white">
                  {groupname}
                </h2>
                <div className="mt-6 flex flex-grow flex-col">
                  <input
                    className="rounded-lg bg-gray-700 px-4 py-2 text-white"
                    placeholder="Enter Name"
                    type="text"
                    onChange={(e) => setDoc({ name: e.target.value })}
                  />
                  <input
                    className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-white"
                    placeholder="Enter Address"
                    type="text"
                    onChange={(e) => setDoc({ address: e.target.value })}
                  />
                  <input
                    className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-white"
                    placeholder="Enter Wishlist Item 1"
                    type="text"
                    onChange={(e) => setDoc({ wishitem1: e.target.value })}
                  />
                  <input
                    className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-white"
                    placeholder="Enter Wishlist Item 2"
                    type="text"
                    onChange={(e) => setDoc({ wishitem2: e.target.value })}
                  />
                  <input
                    className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-white"
                    placeholder="Enter Wishlist Item 3"
                    type="text"
                    onChange={(e) => setDoc({ wishitem3: e.target.value })}
                  />
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      //Before saving a new doc, we need to see the length of the existing data
                      if (groupdata.length === limit) {
                        alert('Sorry but this group is full now');
                        console.log('Why is assignNames not being called?');
                        return;
                      }

                      if(localStorage.getItem(`fireproof.${database.name}.uuid`))
                      {
                        alert("This user has already added one name cannot add more");
                        return;
                      }

                      //Before saving the document we need to assign some uuid random value to the browser
                      localStorage.setItem(`fireproof.${database.name}.uuid`,uuid);
                      saveDoc();
                    }}
                    className="mt-4 w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <main className="relative z-0 flex-1 overflow-y-auto bg-red-500 focus:outline-none">
          <div className="py-6">
            <div className="px-4 sm:px-6 md:px-8">
              <h2 className="text-center text-3xl font-bold text-white">
                Merry Christmas {groupname}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4">{elements}</div>
              {/* <Button onClick={(e)=>
              {
                e.preventDefault();
                assignNames(groupdata.map(element=>element.name))
              }} className="mt-4 w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                Assign Names
              </Button> */}
              {!assignednames && (
                <button
                  onClick={handlebtnclick}
                  className="mt-4 w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                >
                  Assign Names
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function DotIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12.1" cy="12.1" r="1" />
    </svg>
  );
}
