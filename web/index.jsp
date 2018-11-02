<%--
  Created by IntelliJ IDEA.
  User: anton
  Date: 02.11.2018
  Time: 14:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ru">
<head class="main">
  <meta charset="UTF-8">
  <title>Лабораторная работа №2</title>
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
</head>
<body>
<table cellpadding="0" cellspacing="0"   align="center" class="main">
  <tr colspan="3" class="header">
    <td id="head1">Вариант 18002 </td>
    <td id="head2">Авраменко Антон Давыдов Иван</td>
    <td id="head3">P3200</td>
  </tr>
</table>
<table class="main" align="center">

  <tr>

    <td class="task_col">
      <b>Разработанная HTML-страница должна удовлетворять следующим требованиям:</b>
      <ul class="task_list">
        <li>Для расположения текстовых и графических элементов необходимо использовать табличную верстку.</li>
        <li>Данные формы должны передаваться на обработку посредством POST-запроса.</li>
        <li>Таблицы стилей должны располагаться в отдельных файлах.</li>
        <li>При работе с CSS должно быть продемонстрировано использование селекторов псевдоклассов, селекторов атрибутов, селекторов элементов, селекторов идентификаторов а также такие свойства стилей CSS, как наследование и каскадирование.</li>
        <li>HTML-страница должна иметь "шапку", содержащую ФИО студента, номер группы и новер варианта. При оформлении шапки необходимо явным образом задать шрифт (sans-serif), его цвет и размер в каскадной таблице стилей.</li>
        <li>Отступы элементов ввода должны задаваться в пикселях.</li>
        <li>Страница должна содержать сценарий на языке JavaScript, осуществляющий валидацию значений, вводимых пользователем в поля формы. Любые некорректные значения (например, буквы в координатах точки или отрицательный радиус) должны блокироваться.</li>
      </ul>
    </td>
    <td class="task_col">
            <canvas id="grid"></canvas>
    </td>

  </tr>

  <tr>

    <td colspan="2" class="footer" >
      <form id="xyr_form" name="xyr_form" action="script.php" method="post" onsubmit="return validateY()">
        <div id="ch_block">
          <table id="ch_table" align="left">
              <tr>
                  <td>X=</td>
                  <td id="x-block" colspan="3">
                      <input id="x_input" name="X" type="text" placeholder="{-5..5}"
                             required oninvalid="this.setCustomValidity('Введите X')"
                             oninput="setCustomValidity('')"
                             maxlength="5" size="20"></td>

              </tr>
            <tr>
              <td>Y=</td>
              <td id="y-block" colspan="3">
                <input id="y_input" name="Y" type="text" placeholder="{-5..3}"
                       required oninvalid="this.setCustomValidity('Введите Y')"
                       oninput="setCustomValidity('')"
                       maxlength="5" size="20"></td>
            </tr>


            <tr>
              <td>R=</td>
                <td id="r-block" colspan="3">
                    <input id="r_input" name="R" type="text" placeholder="{-5..5}"
                           required oninvalid="this.setCustomValidity('Введите X')"
                           oninput="setCustomValidity('')"
                           maxlength="5" size="20"></td>

            </tr>


            <tr>
              <td></td>
              <td colspan="3" align="center">
                <input type="submit" value="Проверить">
              </td>
            </tr>
          </table>
        </div>
      </form>
    </td>
    <td>
      <div id="resCol"></div>

    </td>


  </tr>

</table>
<script type="text/javascript" src="validator.js"></script>
</body>
</html>
