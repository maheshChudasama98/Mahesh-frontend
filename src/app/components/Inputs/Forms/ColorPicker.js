import React from 'react'
import reactCSS from 'reactcss';
import { SketchPicker, BlockPicker, TwitterPicker } from 'react-color'
import { useState } from 'react';

export const ColorPicker = ({ defaultColor, handleColor }) => {
    const [color, setColor] = useState(defaultColor);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const styles = reactCSS({
        default: {
            color: {
                width: '45px',
                height: '20px',
                borderRadius: '2px',
                background: color,
            },
            swatch: {
                marginRight: '10px',
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
            },
            popover: {
                position: 'absolute',
                zIndex: '10',
            },
            cover: {
                position: 'relative',
                top: '7px',
                right: '20px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    const colors = [
        '#B80000', '#DB3E00', '#FD4A13', '#C45100', '#F44E3B', '#e87716', '#FE9200',
        '#FCDC00', '#FCB900', '#008B02', '#68BC00', '#DBDF00', '#808900', '#007776',
        '#16A5A5', '#EA144C', '#E63946', '#F7688C', '#EB9694', '#FA28FF', '#D24D57',
        '#795548', '#7B64FF', '#5300EB', '#9D00EF', '#009CE0', '#68CCCA', '#73D8FF',
        '#AEA1FF', '#0693E3', '#1273DE', '#004DCF', '#333333', '#29BCB2', '#00D084',
        '#6EFFA9', '#7BDCB5', '#8ED1FC', '#ABB8C3', '#42ABDF', '#EEE084', '#F6E49A',
        '#FDC37F', '#F4A261', '#F7688C', '#FAD0C3', '#C1E1C5', '#BEDADC', '#C4DEF6',
        '#D4C4FB', '#FDA1FF', '#69CCCA']

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChangeColor = (newColor) => {
        handleClose()
        handleColor(newColor.hex);
        setColor(newColor.hex);
    };
    return (
        <>

            <div style={{ display: 'flex', alignItems: 'center' }}>

                <div style={styles.swatch} onClick={handleClick}>
                    <div style={styles.color} />
                </div>

                <h5 style={{ margin: '0', padding: '0', marginRight: '10px', fontSize: '18px', display: 'inline' }}>
                    {'Select color'}
                </h5>

            </div>

            {displayColorPicker ? (
                <>
                    <div style={styles.popover}>
                        <div style={styles.cover} >
                            <TwitterPicker
                                colors={colors}
                                color={color}
                                // width={500}
                                onChangeComplete={handleChangeColor} />
                        </div>
                    </div>
                </>
            ) : null}

        </>
    )
}
