import React, { useEffect , useState } from 'react';
import { View, Button, StyleSheet, Alert , Text , TextInput, Pressable , useColorScheme} from 'react-native';
import app from "../../../firebaseConnect"
import { signInWithRedirect,getAuth ,GoogleAuthProvider , createUserWithEmailAndPassword  , signInWithEmailAndPassword ,signInWithPopup } from "firebase/auth";
import { Loading } from './loading';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');



const LoginScreen = ({ navigation }) => {

 


   function Registar(auth , email , password){


    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("registared", user);
        setLoading(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setLoading(false)
        // ..
      });
    };
    


    
     function login(auth , email , password , navigation ) {
      setLoading(true)
    
        signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.navigate('Homeonline');
        setLoading(false)
        console.log("loging in" , user.uid);
        


        // ...
      })
      .catch((error) => {
        
        const errorMessage = error.message;
        console.error( errorMessage);
        setLoading(false)
      });
    
    }





  const colorScheme = useColorScheme()

  
  

  function today(){
    setTab(true);
    clear()
   
  }
function clear(){
    setLoading(false);
    setEmail("");
    setPassword("");
 }

  function calendar(){
    setTab(false);
    clear();
    
    
  };


  const [ tab , setTab ] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading , setLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  auth.languageCode = 'it';
 
  


  return (
    <View style={colorScheme === 'dark' ? [styles.main , {backgroundColor:"#0F0F0F"}] : [styles.main , {backgroundColor:"#EBEBEB"}]}
    
    >
      <View  style={{flexDirection:"row" , alignItems:"center", justifyContent:"center" , height:"15%"}} >



      <Pressable
       onPress={today}
      style={[styles.tabs, tab ? styles.true : styles.false]} ><Text
      style={[styles.tabTx,  tab ? [styles.tabTx , {color:"black"}] : colorScheme === 'dark' ? [styles.tabTx , {color:"white"}]  : [styles.tabTx , {color:"black"}] ]}
      >REGİSTAR</Text></Pressable>


      <Pressable 
      onPress={calendar}
      style={[styles.tabs, tab ? styles.false : styles.true]} ><Text
      style={[styles.tabTx,  tab ? colorScheme === 'dark' ? [styles.tabTx , {color:"white"}]  : [styles.tabTx , {color:"black"}] : [styles.tabTx , {color:"black"}] ]}
      >LOGİN</Text></Pressable>

      </View>
    <View style={{ borderWidth:0 , width:"100%" , alignItems:"center" , justifyContent:"center" , height:"60%"}} >
    {
      tab ? <View style={styles.container} >
      <Text style={styles.title}>HESAP OLUŞTUR</Text>
      <TextInput
      placeholderTextColor="#EFBA19"
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
      placeholderTextColor="#EFBA19"
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />



{loading ? <Loading renk={"#EFBA19"} /> :<Pressable
     style={[styles.buton , {marginTop:16}]}
     onPress={()=>{Registar(auth, email , password)}}
     >
          <Text style={{color:"#EFBA19" , fontWeight:"bold" , fontSize:20}} >Registar</Text>
      </Pressable>  }


     

</View> : 

<View style={styles.container} >
      <Text style={styles.title}>GİRİŞ YAP</Text>
      <TextInput
      placeholderTextColor="#EFBA19"
        style={styles.input}
        placeholder="E-posta"
       value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
      placeholderTextColor="#EFBA19"
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />


      {loading ? <Loading renk={"#EFBA19"} /> :<Pressable
     style={[styles.buton, {marginTop:22}]}
     onPress={()=> login(auth, email , password , navigation)}
     >
          <Text style={{color:"#EFBA19" , fontWeight:"bold" , fontSize:20}} >LOGIN</Text>
      </Pressable> }

     


     
   

      <Pressable 
      onPress={(() =>navigation.navigate('Home'))}
      style={[styles.buton , {width:"20%" , height:20 , backgroundColor:""}]} >
            
            <Text style={{color:"#EFBA19" , fontWeight:"bold" , fontSize:18}} >GUEST</Text>

      </Pressable>



</View>

    }

    </View>
    


    </View>
  );
};

const styles = StyleSheet.create({

  tabs:{
    borderWidth:0,
    marginLeft:16,
    height:"40%",
    justifyContent:"center",
    borderRadius:41,
    width:150,
    alignItems:"center",
    
   
  },
  main:{
    flex:1,
    alignItems:"center",
    
    
  },
  container: {
    backgroundColor:"#00204C",
    borderWidth:0,
    width:"85%",
    height:"80%",
    marginTop:80,
    borderRadius:41, 
    justifyContent:"center",
    alignItems:"center",

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:"#EFBA19"
  },
  input: {
    height:"20%",
      width:"90%",
      borderBottomWidth:2,
      borderColor:"#EFBA19",
      marginBottom:16,
      textAlign:"center",
      fontSize:25,
      fontWeight:"bold",
      color:"#EFBA19",
      
  },
  buton:{
    alignItems:"center",
    justifyContent:"center",
    height: 40,
    borderColor: 'gray',
    
    marginBottom: 20,
    borderRadius: 41,
    backgroundColor:"white",
    width:"35%",


  },
  tabTx:{
    fontWeight:"bold",
    
   
  },
  true:{
    borderWidth:0,
    marginLeft:16,
    height:"40%",
    justifyContent:"center",
    borderRadius:41,
    width:150,
    alignItems:"center",
    backgroundColor:"#BFD1E5",

  },
  false:{
    borderWidth:1,
    marginLeft:16,
    height:"40%",
    justifyContent:"center",
    borderRadius:41,
    width:150,

    alignItems:"center",
    borderColor:"white"
   
  },

});

export default LoginScreen;
