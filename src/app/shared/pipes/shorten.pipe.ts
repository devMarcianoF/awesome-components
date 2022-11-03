import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  //Vous pourriez vous contenter de dire que  maxLength  est de type
  // number  , mais lui attribuer une valeur par défaut fait que vous
  // n'êtes pas obligé de passer un argument lorsque vous utilisez le
  // Pipe dans vos templates !

  //Passer un deuxième argument à  transform  permet d'implémenter une configuration
  // depuis le template ; ex. :   {{ myText | shorten: 100 }}  ;
  transform(value: string, maxLength = 50): string {
    if (value.length <= maxLength) {
      return value;
    }
    return value.substring(0, maxLength) + '…';
  }
}
