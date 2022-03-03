// React and react native imports
import React, { Component } from "react";
import { Image, StyleSheet, ViewPropTypes, Pressable } from "react-native";
import PropTypes from "prop-types";

// Third party imports
import { 
  createIconSetFromIcoMoon, 
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  Fontisto,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
} from "@expo/vector-icons";

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

class StarButton extends Component {
  constructor(props) {
    super(props);

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress(event) {
    const { halfStarEnabled, starSize, rating, onStarButtonPress } = this.props;

    let addition = 0;

    if (halfStarEnabled) {
      const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
      addition = isHalfSelected ? -0.5 : 0;
    }

    onStarButtonPress(rating + addition);
  }

  iconSetFromProps() {
    const { icoMoonJson, iconSet } = this.props;
    if (icoMoonJson) {
      return createIconSetFromIcoMoon(icoMoonJson);
    }

    return iconSets[iconSet];
  }

  getButtonOpacity(pressed) {
    const { disabled, disabledOpacity, activeOpacity } = this.props;
    if (disabled) {
      return disabledOpacity;
    } else {
      if (pressed) return activeOpacity;
      else return 1;
    }
  };

  makeButtonStyle({ pressed }) {
    return [this.props.buttonStyle, { opacity: getOpacity(pressed) }];
  }

  renderIcon() {
    const {
      reversed,
      starColor,
      starIconName,
      starSize,
      starStyle,
      iconSolid,
    } = this.props;

    const Icon = this.iconSetFromProps();
    let iconElement;

    const newStarStyle = {
      transform: [
        {
          scaleX: reversed ? -1 : 1,
        },
      ],
      ...StyleSheet.flatten(starStyle),
    };

    if (typeof starIconName === "string") {
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
        resizeMode: "contain",
      };

      const iconStyles = [imageStyle, newStarStyle];

      iconElement = <Image source={starIconName} style={iconStyles} />;
    }

    return iconElement;
  }

  render() {
    const { disabled } = this.props;

    return (
      <Pressable
        disabled={disabled}
        style={this.makeButtonStyle}
        onPress={this.onButtonPress}
      >
        {this.renderIcon()}
      </Pressable>
    );
  }
}

StarButton.propTypes = propTypes;
StarButton.defaultProps = defaultProps;

export default StarButton;
