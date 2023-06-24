import { FC } from "react"

interface Props {
  progress: number,
  goal: number
}


export default function Loader ({progress, goal}: Props) {
  return (
    <div className="flex justify-center items-center flex-col font-bold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-900 p-5">
      <h1 className="pb-10">The scraper is running...</h1>
      <div>
        <b>{progress} </b>/ 
        <span> {goal}</span>
      </div>
    </div>
  )
}

