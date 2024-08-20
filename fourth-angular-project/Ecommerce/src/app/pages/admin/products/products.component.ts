import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible: boolean= false;
  productObj: any ={
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": ""
  };
  categoryList: any [] = [];

  constructor(private productSrv: ProductService){

  }
  ngOnInit(): void {
    this.getAllCategory();
  }


  getAllCategory() {
    this.productSrv.getCategory().subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }



  openSidePanel(){
    this.isSidePanelVisible = true;
  }

  closeSidePanel(){
    this.isSidePanelVisible = true;
  }
}
