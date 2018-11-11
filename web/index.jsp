<%--
  Created by IntelliJ IDEA.
  User: divand
  Date: 04.11.2018
  Time: 20:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>LAB 2</title>
  <link rel = "stylesheet" href="css/st.css">
  <script type="text/javascript" src="jquery-3.3.1.js"></script>
</head>
<body>

<!--header-->
<table class="rounded_corners" id="header" cellpadding="0" cellspacing="0" align="center">
  <tbody>
  <tr>
    <td class = "header_cell" align="center" >
        Вариант 18002
    </td>
    <td class = "header_cell" align="center" >
      Авраменко Антон<br>Давыдов Иван
    </td>
    <td class = "header_cell" align="center">
      P3200
    </td>
  </tr>
  </tbody>
</table>



<!-- body -->
<table class="rounded_corners" id="content"  align="center" >

  <tr >


            <td class="input" >
            <form  id="xyr_form" name="xyr_form"  method="post" >

                    <p id = "x-block">Введите координату X:<br>
                        <input id="x_input" type="text" name="X" placeholder="{-5 ... 5}"
                               maxlength="5"
                               required oninvalid="this.setCustomValidity('Введите X')"
                               oninput= "setCustomValidity('')"
                               size="20"
                        ><br></p>
                    <p id = "y-block">Введите координату Y:<br>
                        <input id="y_input" type="text" name="Y" placeholder="{-5 ... 3}"
                               maxlength="5"
                               required oninvalid="this.setCustomValidity('Введите Y')"
                               oninput= "setCustomValidity('')"
                               size="20"
                        ><br></p>
                    <p id = "r-block">Введите параметр R:<br>
                        <input id="r_input" type="text" name="R" placeholder="{1 ... 4}"
                               maxlength="5"
                               required oninvalid="this.setCustomValidity('Введите R')"
                               oninput= "setCustomValidity('')"
                               size="20"
                               value="2"
                        ><br></p>

                      <input type="submit" value="Проверить">
            </form>
            </td>

            <td id="conv_col">
                <canvas id="grid" width="400" height="400"></canvas>
            </td>


  </tr >

  <tr id="main">
          <td id ="result_table_place"  colspan="2" height="0"> </td>
  </tr>

</table>


<!-- footer -->
<table  class="rounded_corners" id="footer" cellpadding="0" cellspacing="0" align="center">
  <tbody>
  <tr >
    <td align="center">
      ВТ-2018
    </td>
    <td align="center">
      &copy;Все права не защищены
    </td>
  </tr>
</table>

<script type="text/javascript" src="validation.js"></script>
</body>
</html>
