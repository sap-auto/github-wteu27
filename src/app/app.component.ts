import { Component } from '@angular/core';
import { createWorker, PSM, OEM } from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tesseract.js-angular-app';
  ocrResult = 'Recognizing...';
  constructor() {
    this.doOCR();
  }
  async doOCR() {
    console.log("started");
    const worker = createWorker({logger: m => console.log(m),
    langPath:"https://tessdata.projectnaptha.com/4.0.0_best"});
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
    await worker.setParameters({
    tessedit_char_whitelist: 'RPrp-0123456789',
    tessedit_ocr_engine_mode:OEM.DEFAULT,
    tessedit_pageseg_mode:PSM.AUTO_OSD
  });
  const { data: { text } } = await worker.recognize('https://firebasestorage.googleapis.com/v0/b/delna-e10d4.appspot.com/o/test%2F2%2FuserId%2F1589362255316_newDoc.png?alt=media&token=4e9734c6-f314-4e41-b8f9-5b41a78d3b9a');
    this.ocrResult = text;
    console.log(text);
    await worker.terminate();
  }
}
