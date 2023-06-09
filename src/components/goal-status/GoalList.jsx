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
    <div className="pl-8 grid grid-cols-1 gap-4 pt-6">
      <div className="space-y-6 border pl-6 pr-3 py-6 rounded-md shadow-lg">
        {cat.data.slice(0, 8).map(i => {
          const progress = parseNum(i.spent) / parseNum(i.target)
          const isCompleted = progress >= 0.75;
          return (
            <div key={i.id} className="">
              <span>{i.title}</span>
              <ProgressBar progress={progress} spent={i.spent} target={i.target} isCompleted={isCompleted} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GoalList
