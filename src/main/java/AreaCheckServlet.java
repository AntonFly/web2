import com.google.gson.Gson;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(
        name = "AreaCheckServlet",
        urlPatterns = "/AreaCheckServlet"
)
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String> responseMap = new HashMap<String, String>();
        List<String> responseList = new ArrayList<String>();

        String x = (String) req.getAttribute("x");
        String y = (String) req.getAttribute("y");
        String r = (String) req.getAttribute("r");
        boolean click = Boolean.parseBoolean((String)(req.getAttribute("click")));
        responseMap.put("x", x);
        responseMap.put("r", r);
        responseMap.put("y", y);




       if (validate(x, y, r, click)) {
            if (isInArea(x, y, r)) {
                responseMap.put("result", "Success");
            } else responseMap.put("result", "Fail");
        } else responseMap.put("result", "Validation fail");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        ServletContext context = getServletContext();
        ArrayList<Map<String, String>> rows = (ArrayList<Map<String, String>>) context.getAttribute("rows");
        rows.add(responseMap);
        context.setAttribute("rows",rows);
        String gson = new Gson().toJson(responseMap);
        out.print(gson);

    }

    private boolean validate(String x, String y, String r, boolean click) {

        if ((isNumeric(x)) && (isNumeric(y)) && (isNumeric(r))) {
            double dx = Double.parseDouble(x);
            double dy = Double.parseDouble(y);
            double dr = Double.parseDouble(r);
            if ((( (dx<=5) && (dx>=-5)) || (click))  && ((dr>=1)&&(dr<=4))
                && (dy <= 5) && (dy >=-5))
                return true;
        }
        return false;
    }

    private boolean isInArea(String x, String y, String r){
        double dx = Double.parseDouble(x);
        double dy = Double.parseDouble(y);
        double dr = Double.parseDouble(r);
        if((dx<=0)&&(dy<=0)){
            if((dx>=-dr/2)&&(dy>=-dr))
                return true;
        }
        else
            if((dx>=0)&&(dy<=0)){
                if(dx*dx+dy*dy<=Math.pow(dr/2,2))
                return true;
            }
            else
                if(dx>=0){
                    if (-0.5*dx+0.5*dr>=dy)
                    return true;
                }
        return false;



        }

    private  boolean isNumeric(String str)
    {
        try
        {
            double d = Double.parseDouble(str);
        }
        catch(NumberFormatException nfe)
        {
            return false;
        }
        return true;
    }
}
