import React, { Component } from 'react';
import './App.css';
import ProductItem from './ProductItem';
import AddItem from './AddItem';

const products = [
{
  title: 'Clean the room',
  desc: 'Clean the living room and study room' ,
  dueDate: '2018-12-18 20:00'
},
{
  title: 'Study',
  desc: 'Study for the finals',
  dueDate: '2018-12-19 20:00'
}
];

localStorage.setItem('products',JSON.stringify(products));
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    
  }

  componentWillMount(){
    const products = this.getProducts();
    this.setState({products});

  }

  getProducts(){
    return this.state.products
    
  }

  onAdd(title, desc, dueDate){
    const products = this.getProducts();

    products.push({
      title,
      desc,
      dueDate
    });

    this.setState({products});
  }
  onDelete(title){
    const products = this.getProducts();
    const filteredProducts = products.filter(product =>{
      return product.title !== title;
    });

    this.setState({products: filteredProducts});
  }

  onEditSubmit(title, desc, dueDate, originalTitle){
    let products = this.getProducts();
    products = products.map(product => {
      if(product.title === originalTitle){
      product.title = title;
      product.desc = desc;
      product.dueDate = dueDate;
    }
    return product;
     });
  this.setState({products});  
}
  render() {
    return (
      <div className="App">
        <h1>To-Do App </h1>
        <AddItem 
         onAdd={this.onAdd}/>
        {
          this.state.products.map(product => {
            return(
             <ProductItem 
             key={product.title}
             {...product}
             onDelete={this.onDelete}
             onEditSubmit={this.onEditSubmit}
             />
            )
          })
        }
      </div>
    );
  }
}

export default App;
