package com.bezkoder.spring.data.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todos")
//@Doc help us to override the collection name by todos
public class Tutorial {
  @Id
  private String id;

  private String title;
  
  public Tutorial() {

  }

  public Tutorial(String title) {
    this.title = title;
    
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

 

  @Override
  public String toString() {
    return "Tutorial [id=" + id + ", title=" + title +  "]";
    //return value in string format.
  }
}
