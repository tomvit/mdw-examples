package com.vitvar.ctu.mdw.commons;

public class Utils {

	/** Converts bytes to hex string **/
	public static String toHexString(byte[] bytes) {
		StringBuffer hexString = new StringBuffer();
		for (int i=0;i<bytes.length;i++) {
		    hexString.append(Integer.toHexString(0xFF & bytes[i]));
		}
		return hexString.toString();
	}

}
