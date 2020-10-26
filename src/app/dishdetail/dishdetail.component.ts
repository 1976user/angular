import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { visibility, flyInOut, expand } from '../animations/app.animations';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  dishcopy: Dish;

  errMsg: string;

  commentForm: FormGroup;
  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'Rating is required.'
    },
    'comment': {
      'required':      'Comment is required.',
      'maxlength':     'Comment cannot be more than 250 characters long.'
    }
  };

  @ViewChild('cForm') commentFormDirective;

  commentPreview: Comment;

  visibility = 'shown';

  constructor(
  	private dishService: DishService,
  	private route: ActivatedRoute,
  	private location: Location,
    private formBuilder: FormBuilder,
    @Inject('BaseURL') private baseURL: string)
  {
    this.createCommentForm();
  }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
  	this.route.params
      .pipe(switchMap((params: Params) => 
        {
          this.visibility = 'hidden';
          return this.dishService.getDish(params['id']);
        }))
      .subscribe(
        dish => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        errMsg => this.errMsg = <any>errMsg);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
  	this.location.back();
  }
  
  createCommentForm(): void {
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [5, [Validators.required]],
      comment: ['', [Validators.required, Validators.maxLength(250)]]
    });

    this.commentForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) return;

    const form = this.commentForm;

    Object.keys(this.formErrors).forEach(field => {
      this.formErrors[field] = '';

      const control = form.get(field);
      if (!control || !control.dirty || control.valid) {
        return;
      }

      const messages = this.validationMessages[field];
      Object.keys(control.errors).forEach(key => {
          this.formErrors[field] = messages[key] + ' ';
      });
    });

    this.commentPreview = form.valid 
      ? <Comment>{
        ...form.value,
        date: '',
      } 
      : null;
  }

  onSubmitCommentForm(): void {
    const comment = {
      ...this.commentForm.value,
      date: new Date().toISOString()
    };
    this.dish.comments.push(comment);

    this.dishcopy.comments.push(comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
          this.dish = dish;
          this.dishcopy = dish;
        },
        errMsg => {
          this.dish = null;
          this.dishcopy = null;
          this.errMsg = <any>errMsg;
        });

    this.commentFormDirective.resetForm();

    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });

    this.commentPreview = null;
  }
}