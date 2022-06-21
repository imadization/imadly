import React, { useRef, useReducer, useContext, useState } from "react";
import cn from "classnames";
import { Hash } from "react-feather";
import { CursorContext } from "../CustomCursor/CursorManager";
import animate from "./animate";
import Image from "./Image";
import "./style.scss";
import Title from "./Title";

import './style.scss'

const initialState = {
  opacity: 0,
  parallaxPos: { x: 0, y: -20 },
  scale: 0.8,
  rotationPosition: 0,
  active: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'MOUSE/ENTER': {
      return {
        ...state,
        active: true,
      }
    }
    case 'MOUSE/LEAVE': {
      return {
        ...state,
        active: false,
      }
    }
    case 'CHANGE/OPACITY': {
      return {
        ...state,
        opacity: action.payload,
      }
    }
    case 'MOUSE/COORDINATES': {
      return {
        ...state,
        parallaxPos: action.payload,
      }
    }
    case 'CHANGE/ROTATION': {
      return {
        ...state,
        rotationPosition: action.payload,
      }
    }
    case 'CHANGE/SCALE': {
      return {
        ...state,
        scale: action.payload,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
export default function ProjectItem({ project, itemIndex }) {
  const listItem = useRef(null)
  const { setSize } = useContext(CursorContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const easeMethod = 'easeInOutCubic'

  const parallax = (event) => {
    const speed = -5
    const x = (window.innerWidth - event.pageX * speed) / 100
    const y = (window.innerHeight - event.pageY * speed) / 100
    dispatch({ type: 'MOUSE/COORDINATES', payload: { x, y } })
  }

  const handleOpacity = (initialOpacity, newOpacity, Duration) => {
    animate({
      fromValue: initialOpacity,
      toValue: newOpacity,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: 'CHANGE/OPACITY', payload: newOpacity })
        callback()
      },
      onComplete: () => {},
      duration: Duration,
      easeMethod: easeMethod,
    })
  }

  const handleRotation = (currentRotation, Duration) => {
    // Random between -15 and 15
    const newRotation =
      Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1)
    animate({
      fromValue: currentRotation,
      toValue: newRotation,
      onUpdate: (newRotation, callback) => {
        dispatch({ type: 'CHANGE/ROTATION', payload: newRotation })
        callback()
      },
      onComplete: () => {},
      duration: Duration,
      easeMethod: easeMethod,
    })
  }

  const handleScale = (initialScale, newScale, Duration) => {
    animate({
      fromValue: initialScale,
      toValue: newScale,
      onUpdate: (newScale, callback) => {
        dispatch({ type: 'CHANGE/SCALE', payload: newScale })
        callback()
      },
      onComplete: () => {},
      duration: Duration,
      easeMethod: easeMethod,
    })
  }

  const handleMouseEnter = () => {
    handleOpacity(0, 1, 500)
    handleRotation(state.rotationPosition, 500)
    handleScale(0.8, 1, 500)
    listItem.current.addEventListener('mousemove', parallax)
    dispatch({ type: 'MOUSE/ENTER' })
    setSize('regular')
  }

  const handleMouseLeave = () => {
    listItem.current.removeEventListener('mousemove', parallax)
    handleOpacity(1, 0, 500)
    handleRotation(state.rotationPosition, 500)
    handleScale(1, initialState.scale, 500)
    dispatch({ type: 'MOUSE/COORDINATES', payload: initialState.parallaxPos })
    dispatch({ type: 'MOUSE/LEAVE' })
    setSize('small')
  }
  return (
    <li className="project-item-container" ref={listItem}>
      <Title
        title={project.title}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <Image
        url={project.url}
        opacity={state.opacity}
        rotationPosition={state.rotationPosition}
        parallaxPos={state.parallaxPos}
        scale={state.scale}
      />

      <div className={cn("info-block", {'as-active' : state.active})}>
        <p className="info-block-header">
          <span>
            <Hash />0{itemIndex}
          </span>
        </p>

        {project.info.map((element) => (
          <p key={element}>
            <span>{element}</span>
          </p>
        ))}
      </div>
    </li>
  )
}
