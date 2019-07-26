package com.hpe.pointnext.appex.aahk.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;



@Controller
public class MigrationController {

	/** Logger initialization */
	final Logger logger = LoggerFactory.getLogger(this.getClass().getSimpleName());

	/** Session variable */
	HttpSession mSession = null;

	/** To manage breadcrum */
	Map<Integer, String> mBreadcrum = null;

	/**
	 * Method check the login credentials and authenticates user
	 * 
	 * @param request
	 * @param response
	 * @param submitname
	 * @param user
	 * @return ModelAndView
	 * @throws IOException
	 */
	@RequestMapping(value = "/login.do", method = RequestMethod.POST)
//	@PreAuthorize("isAuthenticated()")
	public ModelAndView login(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
//		ISystemDelegate systemDelegate = null;
//		List<BasicSystemInfo> lstNotification = new ArrayList<BasicSystemInfo>();
//
//		logger.info("OnboardingServicesController::login() in the login method");
//		try {
//			if (!OnboardingServicesConstant.SUBMITNAME_LOGIN.equals(submitname))
//				redirectToLogout(response);
//
//			mSession = request.getSession(true);
//
//			mBreadcrum = new TreeMap<Integer, String>();
//			mBreadcrum.put(1, OnboardingServicesConstant.BREADCRUM_HOME);
//
//			mSession.setAttribute("OS_BREADCRUM", mBreadcrum);
//			mSession.setAttribute("OS_USERNAME", user.getUsername());
//
//			systemDelegate = new SystemDelegate();
//			lstNotification = systemDelegate.getSystemList();
//
//			Collections.sort(lstNotification, new SystemNotificationComparator());
//
//		} catch (OnboardingServicesAppException oae) {
//			logger.error("OnboardingServicesController::login()::catch(): " + oae);
//			oae.printStackTrace();
//		} catch (OnboardingServicesSystemException ose) {
//			logger.error("OnboardingServicesController::login()::catch(): " + ose.getMessage(), ose);
//			ose.printStackTrace();
//		}
		System.out.println(request.getParameter("login") + "_"  + request.getParameter("password"));
		return new ModelAndView("home", "lstNotification", request.getParameter("login"));
	}

}
