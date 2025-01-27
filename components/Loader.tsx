import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Loader = () => {
    const bar1 = useRef(new Animated.Value(1)).current;
    const bar2 = useRef(new Animated.Value(1)).current;
    const bar3 = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animateBar = (bar, delay) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bar, {
                        toValue: 1.5,
                        duration: 200,
                        delay,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bar, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        animateBar(bar1, 0);
        animateBar(bar2, 250);
        animateBar(bar3, 500);
    }, [bar1, bar2, bar3]);

    return (
        <View style={styles.loader}>
            <Animated.View style={[styles.bar, { transform: [{ scaleY: bar1 }] }]} />
            <Animated.View style={[styles.bar, styles.middleBar, { transform: [{ scaleY: bar2 }] }]} />
            <Animated.View style={[styles.bar, { transform: [{ scaleY: bar3 }] }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        flexDirection: 'row',
        flex : 1,
        alignItems: 'center',
        justifyContent:"center"
    },
    bar: {
        width: 3,
        height: 20,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 10,
    },
    middleBar: {
        height: 35,
        marginHorizontal: 5,
    },
});

export default Loader;
