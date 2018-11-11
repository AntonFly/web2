import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.io.IOUtils;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

@WebServlet(
        name = "ControllerServlet",
        urlPatterns = "/ControllerServlet"
)
public class ControllerServlet extends HttpServlet {

    private void processRequest(HttpServletRequest request, HttpServletResponse response){
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String coorsJson = (IOUtils.toString(req.getReader()));
        System.out.println(coorsJson);
        Type type = new TypeToken<Map<String, String>>(){}.getType();
        Map<String, String> coorsMap = new Gson().fromJson(coorsJson, type);
        String x = coorsMap.get("X");
        String y = coorsMap.get("Y");
        String r = coorsMap.get("R");


        if ((x != null) && (y != null) && (r != null)) {
            req.setAttribute("x", x);
            req.setAttribute("y", y);
            req.setAttribute("r", r);
            String click = coorsMap.get("click");
            req.setAttribute("click", click);
            RequestDispatcher dispatcher = req.getRequestDispatcher("/AreaCheckServlet");
            dispatcher.forward(req, resp);
        }
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String sessionRequest = req.getParameter("getSession");
            if (sessionRequest!=null && Boolean.valueOf(sessionRequest)){
                RequestDispatcher dispatcher = req.getRequestDispatcher("/SessionController");
                dispatcher.forward(req, resp);
            }
        RequestDispatcher dispatcher = req.getRequestDispatcher("/index.jsp");
        dispatcher.forward(req, resp);
    }


}
