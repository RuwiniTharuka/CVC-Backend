/*console.log("Hello World");
const student={
  name:"Rohit",
  phone:"986-7564321",
  parent:{
    name:"joe",
    phone:"986-7564321",
  },

  };
console.log(student.parent.name);
console.log("programe ended sucessfully.");

const student={
  name:"Rohit",
  phone:"986-7564321"
  };
try{
  console.log(student.parent.name);
}catch(e){
  console.log("error");
}finally{
  console.log("try catch is finished.");
}
  console.log("programe ended sucessfully." );

 setTimeout(()=>{
   console.log("Done");
 },10000);

function saveStudent(){
   setTimeout(()=>{
     console.log("Students saved");
   },5000);
}
console.log("started storing student in the database.");
saveStudent();
console.log("finished storing student in the database.");


const connectionStatus=true;
const promise=new Promise(
  (resolve,reject)=>{
    console.log("connecting to the database.");
    console.log("Authenticating......");
    if(connectionStatus){
      setTimeout(()=>{
        console.log("studdent saved");
        resolve()
      },5000);
      }else{
      setTimeout(()=>{
        console.log("student could not be saved");
        reject()
      },5000);
      }
  }
  );

function saveStudent(){
   setTimeout(()=>{
     console.log("Students saved");
   },5000);
}

const connectionStatus=false;
const promise=new Promise(
  (resolve,reject)=>{
    console.log("connecting to the database.");
    console.log("Authenticating......");
    if(connectionStatus){
      setTimeout(()=>{
        console.log("studdent saved");
        resolve("Malith")
      },5000);
      }else{
      setTimeout(()=>{
        console.log("student could not be saved");
        
        reject("Connection status unsuccessfull")
      },5000);
      }
  }
  );
promise.then(
  (res)=>{
    console.log(res)
    console.log("promise is fulfilled");
  }
  ).catch(
    (err)=>{
      console.log(err)
      console.log("promise is unfulfilled");
    }
  )
    
  function saveStudent(){
     setTimeout(()=>{
       console.log("Students saved");
     },5000);
  }

  const connectionStatus=true;
  const promise=new Promise(
    (resolve,reject)=>{
      console.log("connecting to the database.");
      console.log("Authenticating......");
      if(connectionStatus){
        setTimeout(()=>{
          console.log("studdent saved");
          resolve("Malith")
        },5000);
        }else{
        setTimeout(()=>{
          console.log("student could not be saved");

          reject("Connection status unsuccessfull")
        },5000);
        }
    }
    );
  promise.then(
    (res)=>{
      console.log(res)
      console.log("promise is fulfilled");
    }
    ).catch(
      (err)=>{
        console.log(err)
        console.log("promise is unfulfilled");
      }
    )*/

function getAllstudents(password) {
  const p = new Promise((resolve, reject) => {
    if (password == "abc") {
      setTimeout(() => {
        resolve([
          {
            name: "Malith",
            age: 20,
          },
          {
            name: "sahan",
            age: 21,
          },
          {
            name: "Kamal",
            age: 22,
          },
        ]);
      }, 5000);
    } else {
      setTimeout(() => {
        reject("Invalid password");
      }, 5000);
    }
  });
  return p;
}
/*getAllstudents("abc").then(
      (res)=>{
        console.log(res)
      }
      ).catch(
        (err)=>{
          console.log(err)
        }
      )*/

async function run() {
  try {
    const data = await getAllstudents("123");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
run();
