import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ProductRow from './components/productrow'; // va con default
import {a} from './components/productrow'; // va explicita

/*
function Sape()
{
var product = [];
product.stocked = false;
product.name = 'pelota';


  return (<ProductRow
    product={product}
    key = {product.name} />);
}*/



  class ProductTable extends React.Component
  {
    render()
    {
      const filterText = this.props.filterText;
      const inStockOnly = this.props.inStockOnly;
      
      const rows = [];

      //this.props.products.forEach()
      this.props.products.forEach(
        (product) => {
          
          if (product.name.indexOf(filterText) === -1) {
            return;
          }
          if (inStockOnly && !product.stocked) {
            return;
          }
          
          rows.push(
            <ProductRow
              product={product}
              key={product.name} />);
        }
      );

      



      return(  <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>);
    }

    
  }

  class SearchBar extends React.Component
  {
    constructor(props)
    {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e)
    {
      this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e)
    {
      this.props.onInStockChange(e.target.checked);
    }

    

    render()
    {
      const filterText = this.props.filterText;
      const inStockOnly = this.props.inStockOnly;

      return(
      <form>
        <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={this.handleFilterTextChange}
        />
        <p>
          <input
          type="checkbox"
          checked={inStockOnly}
          onChange={this.handleInStockChange}
          />
          {''}
          Only show products in stock
        </p>
      </form>);
    }    
  }

  class FilterableProductTable extends React.Component
  {
    constructor(props)
    {
      super(props);
      this.state =
      {
        filterText: '',
        inStockOnly: false
      };

      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);


    }

    handleFilterTextChange(filterText)
    {
      this.setState({filterText: filterText});
    }

    handleInStockChange(inStockOnly)
    {
      this.setState({inStockOnly: inStockOnly});
    }

    render()
    {
      return(
        <div>
          {a}
          <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
          />
          <ProductTable
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          products={this.props.products}
          />
        </div>
      );
    }
  }


  const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];

// ========================================

ReactDOM.render(
  <FilterableProductTable  products={PRODUCTS} />,
  document.getElementById('root')
);
