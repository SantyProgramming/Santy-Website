import { motion, useMotionValue, useMotionValueEvent, useAnimate, clamp } from 'motion/react'
import * as Icons from 'react-bootstrap-icons'
import styles from '../styles/projectAside.module.css'
import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import useWindowDimensions from "../utils/useWindowDimensions"
import ProjectAsideButton from './projectAsideButton'

import { Link } from "react-router-dom"

export default function ProjectAside({ projectData, handleItemPull }) {
    const viewHeight = useWindowDimensions().height;
    const [motionHeight, setMotionHeight] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0); //Used to tell the other buttons which should be active

    const y = useMotionValue(0);
    const [scope, animate] = useAnimate()

    useEffect(() => {
        const handleAsideResize = () => {
            if (scope.current) {
                setMotionHeight(scope.current.offsetHeight)
            }
        }

        handleAsideResize();
        window.addEventListener('resize', handleAsideResize)

        return () => {
            window.removeEventListener('resize', handleAsideResize)
        }
    })

    function onItemPull(index) {
        handleItemPull(index)
        setActiveIndex(index)
    }

    function handleWheelScroll(event) {
        event.preventDefault();
        animate(scope.current, { y: clamp(-(motionHeight - viewHeight) + 4, -4, y.get() - event.deltaY * 4) }, { type: "spring", bounceStiffness: 200, bounceDamping: 15 })
    }

    return (
        //Constraints have -4 because of the border
        <motion.aside ref={scope}
            className={styles.aside}
            drag="y" initial={{ y: -4 }}
            dragConstraints={{ top: -(motionHeight - viewHeight) + 4, bottom: -4 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 15 }}
            whileTap={{ cursor: "grabbing" }}
            style={{ y }}
            onWheel={handleWheelScroll}
        >
            <div className={styles.asideHeaderContainer}>
                <Link to={"/Santy-Website/"}><Icons.ArrowLeft size={50} /></Link>
                <h2>Projects</h2>
            </div>
            <div className={styles.asideInstructions}>
                <h2><Icons.HandIndex /> Instructions</h2>
                <p>Drag an item to the list to the right to select it</p>
                <p>Drag up and down to scroll through the list</p>
            </div>
            <div className={styles.buttonContainer}>
                {
                    projectData.map((project, index) => (
                        <ProjectAsideButton project={project} key={index} projectIndex={index} activeIndex={activeIndex} onItemPull={() => onItemPull(index)} />
                    ))
                }
            </div>
        </motion.aside>
    )
}