// React and react native imports
import React, { useCallback } from 'react';
import { Image, StyleSheet, ViewPropTypes, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// Third party imports
// import {
//   createIconSetFromIcoMoon,
//   AntDesign,
//   Entypo,
//   EvilIcons,
//   Feather,
//   Fontisto,
//   FontAwesome,
//   FontAwesome5,
//   Foundation,
//   Ionicons,
//   MaterialIcons,
//   MaterialCommunityIcons,
//   Octicons,
//   SimpleLineIcons,
//   Zocial
// } from "@expo/vector-icons";

const iconSets = {
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  Zocial,
  SimpleLineIcons,
  Fontisto,
  AntDesign,
};

const propTypes = {
  buttonStyle: ViewPropTypes.style,
  disabled: PropTypes.bool.isRequired,
  halfStarEnabled: PropTypes.bool.isRequired,
  icoMoonJson: PropTypes.string,
  iconSet: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reversed: PropTypes.bool.isRequired,
  starColor: PropTypes.string.isRequired,
  starIconName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]).isRequired,
  starSize: PropTypes.number.isRequired,
  activeOpacity: PropTypes.number.isRequired,
  disabledOpacity: PropTypes.number,
  starStyle: ViewPropTypes.style,
  iconSolid: PropTypes.bool,
  onStarButtonPress: PropTypes.func.isRequired,
};

const defaultProps = {
  buttonStyle: {},
  disabledOpacity: 1,
  icoMoonJson: undefined,
  starStyle: {},
  iconSolid: false,
};

const StarButton = (props) => {
  const {
    buttonStyle,
    disabled,
    halfStarEnabled,
    icoMoonJson,
    iconSet,
    rating,
    reversed,
    starColor,
    starIconName,
    starSize,
    activeOpacity,
    disabledOpacity,
    starStyle,
    iconSolid,
    onStarButtonPress,
  } = props;

  const onButtonPress = useCallback(
    (event) => {
      let addition = 0;

      if (halfStarEnabled) {
        const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
        addition = isHalfSelected ? -0.5 : 0;
      }

      onStarButtonPress(rating + addition);
    },
    [halfStarEnabled, starSize, rating, onStarButtonPress],
  );

  const iconSetFromProps = () => {
    if (icoMoonJson) {
      return createIconSetFromIcoMoon(icoMoonJson);
    }

    return iconSets[iconSet];
  };

  const getButtonOpacity = useCallback(
    (pressed) => {
      if (disabled) {
        return disabledOpacity;
      }
      if (pressed) return activeOpacity;
      return 1;
    },
    [activeOpacity, disabledOpacity],
  );

  const makeButtonStyle = useCallback(
    ({ pressed }) => [buttonStyle, { opacity: getButtonOpacity(pressed) }],
    [buttonStyle, getButtonOpacity],
  );

  const renderIcon = () => {
    const Icon = iconSetFromProps();
    let iconElement;

    const newStarStyle = {
      transform: [
        {
          scaleX: reversed ? -1 : 1,
        },
      ],
      ...StyleSheet.flatten(starStyle),
    };

    if (typeof starIconName === 'string') {
      iconElement = (
        <Icon
          name={starIconName}
          size={starSize}
          color={starColor}
          style={newStarStyle}
          solid={iconSolid}
        />
      );
    } else {
      const imageStyle = {
        width: starSize,
        height: starSize,
        resizeMode: 'contain',
      };

      const iconStyles = [imageStyle, newStarStyle];

      iconElement = <Image source={starIconName} style={iconStyles} />;
    }

    return iconElement;
  };

  return (
    <Pressable
      disabled={disabled}
      style={makeButtonStyle}
      onPress={onButtonPress}
    >
      {renderIcon()}
    </Pressable>
  );
};

// class StarButton extends Component {
//   constructor(props) {
//     super(props);

//     this.onButtonPress = this.onButtonPress.bind(this);
//   }

//   onButtonPress(event) {
//     const { halfStarEnabled, starSize, rating, onStarButtonPress } = this.props;

//     let addition = 0;

//     if (halfStarEnabled) {
//       const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
//       addition = isHalfSelected ? -0.5 : 0;
//     }

//     onStarButtonPress(rating + addition);
//   }

//   iconSetFromProps() {
//     const { icoMoonJson, iconSet } = this.props;
//     if (icoMoonJson) {
//       return createIconSetFromIcoMoon(icoMoonJson);
//     }

//     return iconSets[iconSet];
//   }

//   getButtonOpacity(pressed) {
//     const { disabled, disabledOpacity, activeOpacity } = this.props;
//     if (disabled) {
//       return disabledOpacity;
//     } else {
//       if (pressed) return activeOpacity;
//       else return 1;
//     }
//   };

//   makeButtonStyle({ pressed }) {
//     return [this.props.buttonStyle, { opacity: getButtonOpacity(pressed) }];
//   }

//   renderIcon() {
//     const {
//       reversed,
//       starColor,
//       starIconName,
//       starSize,
//       starStyle,
//       iconSolid,
//     } = this.props;

//     const Icon = this.iconSetFromProps();
//     let iconElement;

//     const newStarStyle = {
//       transform: [
//         {
//           scaleX: reversed ? -1 : 1,
//         },
//       ],
//       ...StyleSheet.flatten(starStyle),
//     };

//     if (typeof starIconName === "string") {
//       iconElement = (
//         <Icon
//           name={starIconName}
//           size={starSize}
//           color={starColor}
//           style={newStarStyle}
//           solid={iconSolid}
//         />
//       );
//     } else {
//       const imageStyle = {
//         width: starSize,
//         height: starSize,
//         resizeMode: "contain",
//       };

//       const iconStyles = [imageStyle, newStarStyle];

//       iconElement = <Image source={starIconName} style={iconStyles} />;
//     }

//     return iconElement;
//   }

//   render() {
//     const { disabled } = this.props;

//     return (
//       <Pressable
//         disabled={disabled}
//         style={this.makeButtonStyle}
//         onPress={this.onButtonPress}
//       >
//         {this.renderIcon()}
//       </Pressable>
//     );
//   }
// }

StarButton.propTypes = propTypes;
StarButton.defaultProps = defaultProps;

export default StarButton;
