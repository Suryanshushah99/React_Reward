import designs from './Card.module.css';

function Card(props){
    const classes=designs.card +' '+props.class;
    return <div className={classes}>
        {props.children}
    </div>
}

export default Card;