import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailComponent } from '../detail/detail.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isCollapsed = true;
  isVisible = false;
  isOkLoading = false;
  userSelected: any;
  detailForm!: FormGroup;
  public searchText: string = '';
  public checkAction: boolean = false;
  public tenNhanVien: string = '';
  constructor(
    private notification: NzNotificationService,
    private usersServices: UsersService,
    private modalServices: NzModalService,
    private modal: NzModalService
  ) { }
  users: any;
  ngOnInit() {
    this.usersServices.getListUsers().subscribe((res: any) => {
      this.users = res;
      console.log(res);
      localStorage.setItem('userData', JSON.stringify(res));
    });
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    let combineId = localStorage.getItem('combineId');
    userData.forEach((_data: any) => {
      if (combineId == _data.combineId) {
        this.tenNhanVien = _data.tenNV;
      }
      return _data.tenNV;
    });
  }

  getUserName() {
    return sessionStorage.getItem('userName');
  }

  roleAction() {
    if (sessionStorage.getItem('role') === '0') {
      return 'nhan-vien';
    } else if (sessionStorage.getItem('role') === '3') {
      return 'truong-nhom';
    } else if (sessionStorage.getItem('role') === '2') {
      return 'pho-phong';
    } else if (sessionStorage.getItem('role') === '1') {
      return 'truong-phong';
    }
  }

  checkRole(role: string) {
    if (role === 'Truong phong') {
      return 'truong-phong';
    }
    if (role === 'Pho phong') {
      return 'pho-phong';
    }
    if (role === 'Truong nhom') {
      return 3;
    }
  }

  logOut() {
    sessionStorage.removeItem('tokenLogin');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('role');
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }

  showModal(type: string, user?: any): void {
    if (type === 'ADD') {
      this.isVisible = true;
      this.userSelected = null;
      this.checkAction = false;
      console.log('add');
      console.log(this.checkAction);
    } else if (type === 'VIEW' && user) {
      this.isVisible = true;
      this.userSelected = user;
      this.checkAction = true;
      console.log(this.checkAction);
      console.log(this.userSelected.maNV);
    }
  }

  showModalEdit(id: number): void {
    this.usersServices.getUserById(id).subscribe((result: any) => {
      this.modalServices.create(
        {
          nzTitle: 'Update user information',
          nzComponentParams: {
            detail: result,
          },
          nzContent: DetailComponent,
          nzFooter: null,
        }
      )
    })
  }

  createNotification(type: string): void {
    if(type === 'success'){
      this.notification.create(
        type,
        'Delete user successfully',
        '',
        { nzDuration: 2500 },
      );
    } else if(type === 'warning'){
      this.notification.create(
        type,
        'Cancel action',
        '',
        { nzDuration: 2500 },
      );
    }

  }

  showDeleteConfirm(user?: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete the user?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        let success = 'success';
        this.userSelected = user;
        this.usersServices.deleteUser(this.userSelected.maNV).subscribe(() => {
          console.log('delete success');
          this.usersServices.getListUsers();
        });
        this.createNotification(success);
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        let warning = 'warning';
        this.createNotification(warning);
      }
    });
  }

  handleOk(status: boolean, loading: boolean): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = status;
      this.isOkLoading = loading;
    }, 3000)
  }
  
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getRole(role: string) {
    if (role === 'Truong phong') {
      return 'check-role-tp';
    } else if (role === 'Pho phong') {
      return 'check-role-pp';
    } else if (role === 'Truong nhom') {
      return 'check-role-tn';
    }
  }
}
