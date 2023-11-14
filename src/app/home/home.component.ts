/* home ts */

import { Component, OnInit, ElementRef } from "@angular/core";

/*import "bootstrap/dist/css/bootstrap.min.css";*/

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  private value: number = 1;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const buttonNext: HTMLElement | null = document.querySelector("#next");
    const buttonBefore: HTMLElement | null = document.querySelector("#before");

    if (buttonNext && buttonBefore) {
      buttonNext.addEventListener("click", () => {
        this.changePosition(1);
      });

      buttonBefore.addEventListener("click", () => {
        this.changePosition(-1);
      });
    }

    this.showTestimony(this.value);
    this.setupAccordion();
  }

  changePosition(add: number) {
    this.value += add;
    if (this.value < 1) {
      this.value = 3; // Cambia 3 al número total de testimonios
    } else if (this.value > 3) {
      // Cambia 3 al número total de testimonios
      this.value = 1;
    }

    this.showTestimony(this.value);
  }

  showTestimony(testimonyNumber: number) {
    const testimonyBodies: HTMLElement[] = Array.from(
      document.querySelectorAll(".testimony__body")
    );

    testimonyBodies.forEach((body, index) => {
      if (index === testimonyNumber - 1) {
        body.classList.add("testimony__body--show");
      } else {
        body.classList.remove("testimony__body--show");
      }
    });
  }

  setupAccordion() {
    const titleQuestions: HTMLElement[] = Array.from(
      this.el.nativeElement.querySelectorAll(".questions__title")
    );
    titleQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        let height = 0;
        let answer = question.nextElementSibling;
        let addPadding = question.parentElement.parentElement;

        addPadding.classList.toggle("questions__padding--add");
        const arrowIcon = question.querySelector(".questions__arrow");
        if (arrowIcon) {
          arrowIcon.classList.toggle("questions__arrow--rotate");
        }

        if (answer.clientHeight === 0) {
          height = answer.scrollHeight;
        }
        // Establece los estilos usando setAttribute
        answer.setAttribute("style", `height: ${height}px`);
      });
    });
  }
}
