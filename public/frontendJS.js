// initForm function
function initForm() {
  var editor = new FroalaEditor("#content", {
    imageUploadURL: "/upload",
  });
  var editor = new FroalaEditor("#arabic-content", {
    imageUploadURL: "/upload",
  });
}

// validating the form
let submitBtn = document.querySelector(".create-btn");
submitBtn.addEventListener("click", function (e) {
  let title = document.querySelector("input[name='title']").value;
  let author = document.querySelector("input[name='author']").value;
  let description = document.querySelector(
    "textarea[name='description']"
  ).value;
  let content = document.querySelector("textarea[name='']").value;

  if (title == "" || author == "" || description == "") {
    e.required = true;
  } else if (content.length < 10) {
    alert("Please add content");
    e.preventDefault();
  } else {
    document.querySelector("form").submit();
  }
});

// like article function
function likeArticle() {
  let likeCount = document.querySelectorAll(".like-counter");
  for (let i = 0; i < likeCount.length; i++) {
    let currentLikeCount = parseInt(likeCount[i].textContent);
    likeCount[i].textContent = currentLikeCount + 1;
  }

  const articleId = "id";
  $.ajax({
    url: `/article/${articleId}/like`,
    type: "PUT",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// delete article function
function deleteArticle() {
  let confirmation = confirm("Are you sure you want to delete this article?");

  if (confirmation) {
    const section = event.target.closest(".Section");
    section.remove();
    localStorage.setItem("deletedSections", true);
    const id = section.id;
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/article/${id}`, true);
    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send();
  }
}

// This function is for index page
function setLanguage() {
  let lang = document.getElementById("language").selectedIndex;

  if (lang == 1) {
    document.querySelector(".articles-header").style.direction = "rtl";

    for (let i = 0; i < document.querySelectorAll(".Section").length; i++) {
      document.querySelectorAll(".Section")[i].style.direction = "rtl";

      document.querySelectorAll(".Section")[i].style.borderBottomRightRadius =
        "1rem";
      document.querySelectorAll(".Section")[i].style.borderBottomLeftRadius =
        "0";

      document.querySelectorAll(".Section")[i].style.borderLeft = "none";
      document.querySelectorAll(".Section")[i].style.borderRight =
        "3px solid #6d64ff";

      document.querySelectorAll(".section-content")[i].style.marginRight =
        "10px";
      document.querySelectorAll(".section-icon")[i].style.marginRight = "5px";
    }
  } else {
    document.querySelector(".articles-header").style.direction = "ltr";

    for (let i = 0; i < document.querySelectorAll(".Section").length; i++) {
      document.querySelectorAll(".Section")[i].style.direction = "ltr";

      document.querySelectorAll(".Section")[i].style.borderBottomRightRadius =
        "0";
      document.querySelectorAll(".Section")[i].style.borderBottomLeftRadius =
        "1rem";

      document.querySelectorAll(".Section")[i].style.borderLeft =
        "3px solid #6d64ff";
      document.querySelectorAll(".Section")[i].style.borderRight = "none";

      document.querySelectorAll(".Section")[i].style.paddingRight = "10px";

      document.querySelectorAll(".section-content")[i].style.marginLeft =
        "10px";
      document.querySelectorAll(".section-icon")[i].style.marginLeft = "5px";
    }
  }

  const langValue = lang === 1 ? "ar" : "en";
  localStorage.setItem("lang", langValue);

  $.ajax({
    url: `/lang?lang=${langValue}`,
    type: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// This function is for article page
function setLanguage2() {
  let lang = document.getElementById("language2").selectedIndex;

  if (lang == 1) {
    document.getElementsByClassName("introduction")[0].style.direction = "rtl";

    for (let i = 0; i < document.querySelectorAll(".section").length; i++) {
      document.querySelectorAll(".section")[i].style.direction = "rtl";
    }
  } else {
    document.getElementsByClassName("introduction")[0].style.direction = "ltr";

    for (let i = 0; i < document.querySelectorAll(".section").length; i++) {
      document.querySelectorAll(".section")[i].style.direction = "ltr";
    }
  }

  const langValue = lang === 1 ? "ar" : "en";
  localStorage.setItem("lang", langValue);

  $.ajax({
    url: `/lang?lang=${langValue}`,
    type: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// This function is for index page
function retrieveData() {
  const deletedSections = localStorage.getItem("deletedSections");
  if (deletedSections === "true") {
    const section = document.querySelector(".Section");
    section.remove();
  }
}

initForm();
