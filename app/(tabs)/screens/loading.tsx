import React,{useEffect , useState} from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

export const Loading=({renk})=>{
    return(<View style={[{height:"100%",width:"100%" , alignItems:"center" ,justifyContent:"center" }]} >
            <ActivityIndicator size="large" color={renk} />

    </View>)
}