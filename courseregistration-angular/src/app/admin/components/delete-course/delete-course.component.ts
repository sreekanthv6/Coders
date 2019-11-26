import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/registration/model/course';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.scss']
})
export class DeleteCourseComponent implements OnInit {

  existingcourses: Array<Course>;
  constructor(private adminService: AdminService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.adminService.fetchExistingCourses().subscribe(resp => {
      let flag: Course[]=resp.json();
      console.log(JSON.stringify(flag));
      this.existingcourses=flag;
    });
  }
  onsubmit(courseId: string) {
    this.spinner.show();
    this.adminService.deleteCourse(courseId).subscribe(resp => {
      let flag = resp.json();
      this.spinner.hide();
      if(flag==1)
      alert("Course has been deleted successfully");
      else
      alert("error");
    });
  }


}
