import React,{useEffect , useState} from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

export const Loading=({renk})=>{
    return(<View style={[{margin:12, alignItems:"center" ,justifyContent:"center" }]} >
            <ActivityIndicator size="large" color={renk} />

    </View>)
}