import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() detail: any;
  @Output() hideEvent = new EventEmitter<boolean>();
  @Output() loading = new EventEmitter<boolean>();
  date = null;
  isLoading = false;
  detailForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.detailForm = this.formBuilder.group({
      maNV: [''],
      tenNV: ['', Validators.required],
      namSinh: ['', Validators.required],
      gioiTinh: ['Male', Validators.required],
      chucVu: ['', Validators.required],
      queQuan: ['', Validators.required],
      deviceUsed: ['', Validators.required],
      ngayNhanViec: ['', Validators.required],
      numberPrefix: ['+84'],
      soDienThoai: ['', [Validators.required, Validators.maxLength(9)]],
      email: ['', [Validators.email, Validators.required]],
      team: ['', Validators.required],
      programLanguage: ['', Validators.required],
    });
    if (this.detail) {
      // this.detailForm.controls['maNV'].patchValue(this.detail.maNV);
      this.detailForm.controls['tenNV'].patchValue(this.detail.tenNV);
      this.detailForm.controls['namSinh'].patchValue(this.detail.namSinh);
      this.detailForm.controls['gioiTinh'].patchValue(this.detail.gioiTinh);
      this.detailForm.controls['chucVu'].patchValue(this.detail.chucVu);
      this.detailForm.controls['queQuan'].patchValue(this.detail.queQuan);
      this.detailForm.controls['deviceUsed'].patchValue(this.detail.deviceUsed);
      this.detailForm.controls['ngayNhanViec'].patchValue(this.detail.ngayNhanViec);
      this.detailForm.controls['numberPrefix'].patchValue(this.detail.numberPrefix);
      this.detailForm.controls['soDienThoai'].patchValue(this.detail.soDienThoai);
      this.detailForm.controls['email'].patchValue(this.detail.email);
      this.detailForm.controls['team'].patchValue(this.detail.team);
      this.detailForm.controls['programLanguage'].patchValue(this.detail.programLanguage);
    }
    console.log(this.detail);
  }

  checkRole() {
    if(localStorage.getItem('combineId') === '3'){
      return 3;
    }else if(localStorage.getItem('combineId') === '2'){
      return 2;
    }
  }

  submitData(): void {
    console.log(this.detailForm);
    console.log(this.detailForm.status);
    if (this.detailForm.valid) {
      console.log('valid');
      const userData = { 
        maNV: this.detailForm.controls['maNV'].value,
        tenNV: this.detailForm.controls['tenNV'].value,
        namSinh: this.detailForm.controls['namSinh'].value,
        gioiTinh: this.detailForm.controls['gioiTinh'].value,
        chucVu: this.detailForm.controls['chucVu'].value,
        queQuan: this.detailForm.controls['queQuan'].value,
        deviceUsed: this.detailForm.controls['deviceUsed'].value,
        ngayNhanViec: this.detailForm.controls['ngayNhanViec'].value,
        numberPrefix: this.detailForm.controls['numberPrefix'].value,
        soDienThoai: this.detailForm.controls['soDienThoai'].value,
        email: this.detailForm.controls['email'].value,
        team: this.detailForm.controls['team'].value, 
        programLanguage: this.detailForm.controls['programLanguage'].value,
      }

      if (this.detail === null) {
        console.log('add');
        // this.usersService.addUser(userData).subscribe((result) => {
        //   console.log(result);
        // })
        this.hideEvent.emit(false);
        this.loading.emit(false);
      } else {
        console.log('edit');
        console.log(this.detail['maNV']);
        this.usersService.updateUser(this.detail['maNV'], userData).subscribe((result) => {
          console.log(result);
        });
      }
      console.log(this.detailForm.value);
    }
    else {
      console.log('invalid form');
      Object.values(this.detailForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
