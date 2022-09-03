import langLocalization from "../Lang/langLocalization"

const filterItems = () => {
    const locale = uselangLocalization();
    switch (newFilterMode){
        case filter.all: 
            return updatedList.todoList;        
        case filter.done:
            return updatedList.todoList.filter((someItem) => someItem.status === true);
        case filter.new:
            return updatedList.todoList.filter((someItem) => someItem.status === false);
    }
}

<div className="filterBar"> show 
    <button className="feiter buttons" onClick = {()=>updateFilter(filter.all)}>{locale.button.all}</button>
    <button className="feiter buttons"  onClick = {()=>updateFilter(filter.done)}>{locale.button.done}</button>
    <button className="feiter buttons"  onClick = {()=>updateFilter(filter.new)}>{locale.button.new}</button>
</div>

export default filterItems;