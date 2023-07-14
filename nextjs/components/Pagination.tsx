import * as React from 'react';
import { useEffect } from 'react';


export interface IPaginationProps {
    setItems: Function
    perPage: number
    items: Array<object>
    rest?: object
}

const buttonSyeles = {
    base: " px-4 py-2 text-sm font-medium border ",
    default: " text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ",
    disabled: " text-gray-500 bg-gray-200 border-gray-200 hover:cursor-not-allowed "
}

const enum ClickType {
    Prev,
    Next,
}

interface EdgeCondition {
    (): Boolean;
}

interface OperationResult{
    (a: number, b: number): number
}

interface ClickBlueprint {
    condition: EdgeCondition,
    operation: OperationResult

}

// function returning the correct number of listings to show in UI
const cappedListingEnd = (end: number, items: Array<object>, perPage: number) => end <= items.length ? end : (end - perPage) + (items.length - (end - perPage))


export default function Pagination ({setItems, perPage, items, rest}: IPaginationProps) {
    const [start, setStart] = React.useState(1);
    const [end, setEnd] = React.useState(perPage);

    // condiiton, whether the pagination is at the start, or at the very end 
    const edgeConditions = {
        [ClickType.Prev]: () => start <= 1,
        [ClickType.Next]: () => end >= items.length
    }

    // the condition is not in this object directly, because it's also used by the button styles
    const clickBlueprints = {
        [ClickType.Prev]: { // substitution
            condition: edgeConditions[ClickType.Prev], 
            operation: (a: number, b: number): number => a - b
        },
        [ClickType.Next]: { // adition
            condition: edgeConditions[ClickType.Next], 
            operation: (a: number, b: number) => a + b
        },
    }

    // NOTE: althogh the most effitient code duplication-wise, mabye a bit too complex for given problem
    const handleClickFactory = (clickBlueprint: ClickBlueprint) => {
        const { condition, operation } = clickBlueprint;
        
        if (!condition()){
            const [newStart, newEnd] = [operation(start, perPage), operation(end, perPage)]
            setStart(newStart);
            setEnd(newEnd);
            setItems(items.slice(newStart-1, cappedListingEnd(newEnd, items, perPage)))
        }
    }

    useEffect(() => {
        setItems(items.slice(start-1, end));
    }, [])

  return (
    <div {...rest}>
        <div  className="flex flex-row  justify-between p-5">
        <span className="text-sm pb-2">
            Showing <span className="font-semibold text-gray-900 ">{start}</span> to <span className="font-semibold text-gray-900 ">{cappedListingEnd(end, items, perPage)}</span> of <span className="font-semibold text-gray-900 ">{items.length}</span> Entries
        </span>
        <div className="inline-flex rounded-md shadow-sm" role="group">
            <button 
                onClick={()=>handleClickFactory(clickBlueprints[ClickType.Prev])} 
                className={buttonSyeles.base + "rounded-l-lg" + buttonSyeles[edgeConditions[ClickType.Prev]() ? "disabled" : "default"]}>
                Prev
            </button>
            <button 
                onClick={()=>handleClickFactory(clickBlueprints[ClickType.Next])} 
                className={buttonSyeles.base + "rounded-r-lg" + buttonSyeles[edgeConditions[ClickType.Next]() ? "disabled" : "default"]}>
                Next
            </button>
        </div>
        </div>
    </div>
  );
}
