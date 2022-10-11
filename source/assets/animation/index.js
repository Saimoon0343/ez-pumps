import {Animated} from 'react-native';

var isHidden = true;

export const _animateFromTop = (topBounceValue) => {    

    var toValue = 0;
    Animated.spring(
      topBounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver:true
      }
    ).start();
    isHidden = !isHidden;
    
}
export const _animateFromBottom = (bottomBounceValue) => {    

    var toValue = 0;
    Animated.spring(
    bottomBounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver:true
      }
    ).start();
    isHidden = !isHidden;
    
}