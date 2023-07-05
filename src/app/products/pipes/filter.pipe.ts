import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allproducts:any[], searchTerm:string,proprtyName:string): any[] {
    const result:any[]=[];

    if(!allproducts||searchTerm==''||proprtyName==''){
      return allproducts;
    }
    allproducts.forEach((item:any)=>{
      if(item[proprtyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
