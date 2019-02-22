import { StyleSheet, View, TouchableHighlight, Dimensions, Animated, Image } from 'react-native';
import React, { Component } from 'react';

import Svg, { Circle, Path } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

class TabBarItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let child: any = this.props.children;

        if (child.length && child.length > 0) {
            throw new Error('onlyChild must be passed a children with exactly one child.');
        }

        return <View style={{ flex: 1 }}>{child}</View>;
    }
}

export default class TabBar extends Component<any, any> {
    constructor(props) {
        super(props);
        if (this.props.children.length != 4) {
            throw new Error('Three tab should be work.');
        }
        this.state = {
            selectedIndex: 0,
            defaultPage: 0,
            navFontSize: 12,
            navTextColor: 'rgb(148, 148, 148)',
            navTextColorSelected: 'rgb(51, 163, 244)',
            circleRadius: new Animated.Value(175),
            pathD: new Animated.Value(-15),
            pathX: '-15',
            pathY: '303',
            pathA: '315',
            pathB: '335',
            showIcon: true
        };

        this.state.circleRadius.addListener(circleRadius => {
            this._myCircle.setNativeProps({ cx: circleRadius.value.toString() });
        });

        this.state.pathD.addListener(a => {
            this.setState({
                pathX: a.value.toString(),
                pathY: (318 + parseInt(a.value)).toString(),
                pathA: (330 + parseInt(a.value)).toString(),
                pathB: (350 + parseInt(a.value)).toString()
            });
        });
    }

    _myCircle = null;

    render() {
        const { children } = this.props;
        const {
            selectedIndex,
            navFontSize,
            navTextColor,
            navTextColorSelected,
            showIcon
        } = this.state;

        return (
            <View
                style={[
                    styles.container,
                    this.props.style,
                    children[this.state.selectedIndex].props.screenBackgroundColor
                        ? children[this.state.selectedIndex].props.screenBackgroundColor
                        : '#008080'
                ]}
            >
                {children[selectedIndex]}
                <View style={[styles.content]}>
                    <View style={styles.subContent}>
                        {React.Children.map(children, (child, i) => {
                            const imgSrc =
                                selectedIndex == i && showIcon ? (
                                    <View style={styles.circle}>
                                        <Image
                                            style={styles.navImage}
                                            resizeMode="cover"
                                            // @ts-ignore
                                            source={child.props.selectedIcon}
                                        />
                                    </View>
                                ) : (
                                    <Image
                                        style={styles.navImage}
                                        resizeMode="cover"
                                        // @ts-ignore
                                        source={child.props.icon}
                                    />
                                );
                            return (
                                <TouchableHighlight
                                    key={i}
                                    underlayColor={'transparent'}
                                    style={styles.navItem}
                                    onPress={() => this.update(i)}
                                >
                                    {imgSrc}
                                </TouchableHighlight>
                            );
                        })}
                    </View>
                    <Svg
                        version="1.1"
                        id="bottom-bar"
                        x="0px"
                        y="0px"
                        width="100%"
                        height="100"
                        viewBox="0 0 1092 260"
                        space="preserve"
                    >
                        <AnimatedPath
                            fill="#f0f0f0"
                            d={`M30,60h${
                                this.state.pathX
                            }.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${
                                this.state.pathY
                            }.7,74.5,${this.state.pathA}.5,60,${
                                this.state.pathB
                            }.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`}
                        />
                        <AnimatedCircle
                            ref={ref => (this._myCircle = ref)}
                            fill="#f0f0f0"
                            cx="175"
                            cy="100"
                            r="100"
                        />
                    </Svg>
                </View>
            </View>
        );
    }
    update(index) {
        let that = this;
        that.setState({
            selectedIndex: index,
            showIcon: false
        });
        if (index == 0) {
            Animated.spring(that.state.pathD, { toValue: -15, duration: 10, friction: 10 }).start();
            setTimeout(function() {
                that.setState({
                    showIcon: true
                });
            }, 100);
            Animated.spring(that.state.circleRadius, { toValue: 175, friction: 10 }).start();
        } else if (index == 1) {
            Animated.spring(that.state.pathD, { toValue: 230, duration: 10, friction: 10 }).start();

            setTimeout(function() {
                that.setState({
                    showIcon: true
                });
            }, 100);
            Animated.spring(that.state.circleRadius, { toValue: 420, friction: 10 }).start();
        } else if (index == 2) {
            Animated.spring(that.state.pathD, { toValue: 480, duration: 10, friction: 10 }).start();

            setTimeout(function() {
                that.setState({
                    showIcon: true
                });
            }, 100);
            Animated.spring(that.state.circleRadius, { toValue: 670, friction: 10 }).start();
        } else {
            Animated.spring(that.state.pathD, { toValue: 730, duration: 10, friction: 10 }).start();

            setTimeout(function() {
                that.setState({
                    showIcon: true
                });
            }, 100);
            Animated.spring(that.state.circleRadius, { toValue: 920, friction: 10 }).start();
        }
    }
}

TabBar.Item = TabBarItem;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'
    },
    content: {
        flexDirection: 'column',
        zIndex: 0,
        width: Dimensions.get('window').width - 30,
        marginBottom: '4%',
        left: '4%',
        right: '4%'
    },
    subContent: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        zIndex: 1,
        position: 'absolute',
        bottom: 5
    },
    navItem: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        alignItems: 'center',
        zIndex: 0
    },
    navImage: {
        width: 40,
        height: 40
    },
    circle: {
        bottom: 18
    }
});
