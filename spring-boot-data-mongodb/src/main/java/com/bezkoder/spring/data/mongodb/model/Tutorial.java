package com.bezkoder.spring.data.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todos")
//@Doc help us to override the collection name by todos
public class Tutorial {
  @Id
  private String id;

  private String title;
  
  private boolean isTaskCompleted;

  public Tutorial() {

  }

  public Tutorial(String title, boolean isTaskCompleted) {
    this.title = title;
    this.isTaskCompleted = isTaskCompleted;
    
  }

  public String getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }


  public boolean getisTaskCompleted() {
    return isTaskCompleted;
  }

  public void setisTaskCompleted(boolean isTaskCompleted) {
    this.isTaskCompleted = isTaskCompleted;
  }

 

  @Override
  public String toString() {
    return "Tutorial [id=" + id + ", title=" + title +", isTaskCompleted="+ isTaskCompleted + "]";
    //return value in string format.
  }
}
