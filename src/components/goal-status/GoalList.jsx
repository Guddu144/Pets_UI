import React, { useEffect, useState } from 'react'
import ProgressBar from '../common/ProgressBar'
import { fetchCategory } from '../../infra';
import { parseNum } from '../../utils';

const GoalList = () => {

  const [cat, setCat] = useState()
  useEffect(() => {
    fetchCategory()
      .then(setCat)
  }, []);

  if (!cat) {
    return null
  }

  return (
    <div className="pl-8 grid grid-cols-2 gap-4 pt-6">
      <div className="space-y-6 border pl-6 pr-3 py-6 rounded-md shadow-2xl">
        {cat.data.slice(0, 8).map(i => {
          const progress = parseNum(i.spent) / parseNum(i.target)
          return (
            <div key={i.id} className="">
              <span>{i.title}</span>
              <ProgressBar progress={progress} spent={i.spent} target={i.target} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GoalList
